//booking pages
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const services = [
  { id: 1, name: 'Haircut', price: 200, duration: 30 },
  { id: 2, name: 'Beard Trim', price: 100, duration: 15 },
  { id: 3, name: 'Facial', price: 500, duration: 45 },
  { id: 4, name: 'Massage', price: 800, duration: 60 }
];

export default function BookAppointment() {
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const handleProceed = async () => {
    try {
      // Get user's location
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Find nearby salons
        const response = await axios.get('/api/salons/nearby', {
          params: {
            lat: latitude,
            lng: longitude,
            services: selectedServices.join(',')
          }
        });
        
        navigate('/salons', { state: { 
          salons: response.data,
          selectedServices 
        }});
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Select Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => (
          <div 
            key={service.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedServices.includes(service.id) 
                ? 'bg-blue-50 border-blue-500' 
                : 'border-gray-200'
            }`}
            onClick={() => handleServiceToggle(service.id)}
          >
            <div className="flex justify-between">
              <h3>{service.name}</h3>
              <span>₹{service.price}</span>
            </div>
            <p className="text-sm text-gray-600">{service.duration} minutes</p>
          </div>
        ))}
      </div>
      <button 
        onClick={handleProceed}
        disabled={!selectedServices.length}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        Proceed to Book (₹5 booking fee)
      </button>
    </div>
  );
}