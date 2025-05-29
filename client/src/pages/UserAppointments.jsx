import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserAppointments() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/bookings', {
          params: { userId: currentUser.id }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchAppointments();
    }
  }, [currentUser]);

  const handleCancel = async (id) => {
    try {
      await axios.put(`/api/bookings/${id}/cancel`);
      setAppointments(appointments.map(appt => 
        appt._id === id ? { ...appt, status: 'cancelled' } : appt
      ));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view your appointments</h2>
        <Link 
          to="/login" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading appointments...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>
      
      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">You don't have any appointments yet</p>
          <Link 
            to="/book" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map(appointment => (
            <div 
              key={appointment._id} 
              className={`border rounded-lg p-6 ${appointment.status === 'cancelled' ? 'bg-gray-50' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{appointment.salon.name}</h2>
                  <p className="text-gray-600">{new Date(appointment.date).toLocaleString()}</p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-right mb-2">
                    <p className="text-lg font-semibold">₹{appointment.totalPrice}</p>
                    <p className="text-sm text-gray-500">(Includes ₹5 booking fee)</p>
                  </div>
                  
                  {appointment.status !== 'cancelled' && (
                    <button
                      onClick={() => handleCancel(appointment._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium mb-2">Services Booked:</h3>
                <ul className="space-y-2">
                  {appointment.services.map((service, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{service.name}</span>
                      <span>₹{service.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// "@ | Out-File -FilePath ".\client\src\pages\UserAppointments.jsx" -Encoding UTF8