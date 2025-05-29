//ye page abhi show nhi kr rha h.
import React from 'react';
import { Link } from 'react-router-dom';

export default function SalonCard({ salon }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{salon.name}</h3>
      <p className="text-gray-600 mb-2">{salon.address}</p>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500">★</span>
        <span className="ml-1">{salon.rating}</span>
        <span className="mx-2 text-gray-400">•</span>
        <span>{salon.distance} km away</span>
      </div>
      <Link 
        to={`/book/${salon._id}`}
        className="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
      >
        Book Now
      </Link>
    </div>
  );
}