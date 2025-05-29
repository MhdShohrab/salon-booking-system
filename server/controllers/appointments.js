const Appointment = require('../models/Appointment');
const Salon = require('../models/Salon');
const User = require('../models/User');

exports.createAppointment = async (req, res) => {
  try {
    const { salonId, services, appointmentDate } = req.body;
    const userId = req.user.id;

    // Get salon details
    const salon = await Salon.findById(salonId);
    if (!salon) {
      return res.status(404).json({ msg: 'Salon not found' });
    }

    // Calculate total price and duration
    let totalPrice = 5; // Booking fee
    let totalDuration = 0;
    
    const selectedServices = salon.services.filter(service => 
      services.includes(service.name)
    );
    
    selectedServices.forEach(service => {
      totalPrice += service.price;
      totalDuration += service.duration;
    });

    // Find the next available time slot
    const lastAppointment = await Appointment.findOne({ salon: salonId })
      .sort({ estimatedEndTime: -1 });
    
    let estimatedStartTime;
    if (lastAppointment && new Date(lastAppointment.estimatedEndTime) > new Date()) {
      estimatedStartTime = new Date(lastAppointment.estimatedEndTime);
    } else {
      estimatedStartTime = new Date(appointmentDate);
    }
    
    const estimatedEndTime = new Date(estimatedStartTime.getTime() + totalDuration * 60000);

    // Create appointment
    const appointment = new Appointment({
      user: userId,
      salon: salonId,
      services: selectedServices.map(service => ({
        name: service.name,
        price: service.price
      })),
      totalPrice,
      appointmentDate,
      estimatedStartTime,
      estimatedEndTime,
      status: 'pending'
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate('salon', 'name address');
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    
    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    appointment.status = 'cancelled';
    await appointment.save();
    
    res.json({ msg: 'Appointment cancelled', bookingFee: 'Non-refundable' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};