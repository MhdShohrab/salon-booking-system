import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceSelection from '../components/ServiceSelection';
import SalonCard from '../components/SalonCard';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const BookAppointment = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [salons, setSalons] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Error getting location", error);
        toast.error("Please enable location services for better salon recommendations");
      }
    );
  }, []);

  const handleServiceSelection = (services) => {
    setSelectedServices(services);
  };

  const findSalons = async () => {
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/salons/nearby', {
        services: selectedServices.map(s => s._id),
        location: userLocation
      });
      setSalons(response.data);
    } catch (error) {
      toast.error("Error finding salons");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return selectedServices.reduce((sum, service) => sum + service.price, 5); // 5 rupee booking fee
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Appointment</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ServiceSelection onSelectionChange={handleServiceSelection} />
          
          {selectedServices.length > 0 && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Selected Services</h2>
              <ul className="space-y-2">
                {selectedServices.map(service => (
                  <li key={service._id} className="flex justify-between">
                    <span>{service.name}</span>
                    <span>₹{service.price} - {service.duration} mins</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t flex justify-between font-bold">
                <span>Total + Booking Fee:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              
              <button 
                onClick={findSalons}
                className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? 'Finding Salons...' : 'Find Nearby Salons'}
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Salons</h2>
          {salons.length > 0 ? (
            salons.map(salon => (
              <SalonCard 
                key={salon._id} 
                salon={salon} 
                onSelect={() => navigate(`/salons/${salon._id}`)}
                distance={salon.distance}
                waitTime={salon.waitTime}
              />
            ))
          ) : (
            <p className="text-gray-500">
              {selectedServices.length > 0 
                ? "Click 'Find Nearby Salons' to see options"
                : "Select services to see available salons"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;