//booking salon...
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function SalonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [salon, setSalon] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const response = await axios.get(`/api/salons/${id}`);
        setSalon(response.data);
      } catch (error) {
        console.error('Error fetching salon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalon();
  }, [id]);

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => 
      prev.some(s => s.name === service.name)
        ? prev.filter(s => s.name !== service.name)
        : [...prev, service]
    );
  };

  const handleBookNow = async () => {
    if (!currentUser) {
      navigate('/login', { state: { from: `/salons/${id}` } });
      return;
    }

    try {
      const bookingData = {
        salon: id,
        services: selectedServices,
        totalPrice: selectedServices.reduce((sum, service) => sum + service.price, 5) // ₹5 booking fee
      };

      await axios.post('/api/bookings', bookingData);
      setBookingSuccess(true);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!salon) return <div className="text-center py-8">Salon not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Salon Header */}
        <div className="bg-gray-800 text-white p-6">
          <h1 className="text-3xl font-bold">{salon.name}</h1>
          <p className="text-gray-300 mt-2">{salon.address}</p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{salon.rating}</span>
            <span className="mx-2">•</span>
            <span>{salon.distance} km away</span>
          </div>
        </div>

        {/* Salon Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Salon Info */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">About This Salon</h2>
              <p className="text-gray-700 mb-6">{salon.description}</p>

              <h2 className="text-2xl font-semibold mb-4">Services</h2>
              <div className="space-y-4">
                {salon.services.map(service => (
                  <div 
                    key={service.name}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedServices.some(s => s.name === service.name) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => handleServiceToggle(service)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.duration} mins</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{service.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Summary */}
            <div className="border rounded-lg p-6 h-fit sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              {selectedServices.length > 0 ? (
                <>
                  <div className="space-y-2 mb-4">
                    {selectedServices.map(service => (
                      <div key={service.name} className="flex justify-between">
                        <span>{service.name}</span>
                        <span>₹{service.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t pt-2">
                      <span>Booking Fee</span>
                      <span>₹5</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total</span>
                      <span>
                        ₹{selectedServices.reduce((sum, service) => sum + service.price, 5)}
                      </span>
                    </div>
                  </div>

                  {bookingSuccess ? (
                    <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
                      Booking successful! We'll see you soon.
                    </div>
                  ) : (
                    <button
                      onClick={handleBookNow}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                      Book Now
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500">Select services to book</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// "@ | Out-File -FilePath ".\client\src\pages\SalonDetail.jsx" -Encoding UTF8