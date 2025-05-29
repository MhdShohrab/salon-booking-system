//services ka h.
import React, { useState } from 'react';

const services = [
  { id: 'haircut', name: 'Haircut', price: 200, duration: 30 },
  { id: 'beard-trim', name: 'Beard Trim', price: 100, duration: 15 },
  { id: 'facial', name: 'Facial', price: 500, duration: 45 },
  { id: 'massage', name: 'Massage', price: 800, duration: 60 },
  { id: 'hair-color', name: 'Hair Color', price: 700, duration: 90 },
  { id: 'shave', name: 'Shave', price: 150, duration: 20 },
];

const ServiceSelection = ({ onNext, selectedServices }) => {
  const [selected, setSelected] = useState(selectedServices);

  const toggleService = (serviceId) => {
    if (selected.includes(serviceId)) {
      setSelected(selected.filter(id => id !== serviceId));
    } else {
      setSelected([...selected, serviceId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected.length === 0) {
      alert('Please select at least one service');
      return;
    }
    onNext(selected);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {services.map(service => (
          <div 
            key={service.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selected.includes(service.id) 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => toggleService(service.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-sm text-gray-600">₹{service.price} • {service.duration} mins</p>
              </div>
              {selected.includes(service.id) && (
                <span className="text-blue-500">✓</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={selected.length === 0}
        >
          Next: Choose Salon
        </button>
      </div>
    </form>
  );
};

export default ServiceSelection;