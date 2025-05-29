const Salon = require('../models/Salon');

exports.getNearbySalons = async (req, res) => {
  try {
    const { longitude, latitude, services } = req.query;
    
    // For future AI implementation, we'll add more parameters here
    const query = {};
    
    if (services) {
      query['services.name'] = { $in: services.split(',') };
    }
    
    const salons = await Salon.find({
      ...query,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: 10000 // 10km radius
        }
      }
    }).limit(20);

    res.json(salons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSalonById = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);
    if (!salon) {
      return res.status(404).json({ msg: 'Salon not found' });
    }
    res.json(salon);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Salon not found' });
    }
    res.status(500).send('Server error');
  }
};