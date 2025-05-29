//Services.jsx
//services page hai ye.
import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    name: "Classic Haircut",
    description: "Professional haircut with styling using premium products",
    price: 300,
    duration: 45,
    icon: "✂️",
  },
  {
    id: 2,
    name: "Beard Trim & Shape",
    description: "Precision beard trimming and shaping for a polished look",
    price: 200,
    duration: 30,
    icon: "🧔",
  },
  {
    id: 3,
    name: "Royal Facial",
    description: "Deep cleansing facial with massage and mask treatment",
    price: 600,
    duration: 60,
    icon: "🧖‍♂️",
  },
  {
    id: 4,
    name: "Head Massage",
    description: "Relaxing head massage with aromatic oils",
    price: 400,
    duration: 30,
    icon: "💆‍♂️",
  },
  {
    id: 5,
    name: "Hair Color",
    description: "Professional hair coloring with ammonia-free products",
    price: 800,
    duration: 90,
    icon: "🎨",
  },
  {
    id: 6,
    name: "Complete Grooming",
    description: "Haircut, beard trim, and facial combo package",
    price: 1000,
    duration: 120,
    icon: "✨",
  },
];

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Premium grooming services tailored for modern men
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold">{service.name}</h2>
                <span className="text-3xl">{service.icon}</span>
              </div>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-700 font-medium">
                    ₹{service.price}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500">{service.duration} mins</span>
                </div>
                <Link
                  to="/book"
                  state={{ preselectedService: service.id }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/book"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition"
        >
          View All Booking Options
        </Link>
      </div>
    </div>
  );
}
// "@ | Out-File -FilePath ".\client\src\pages\Services.jsx" -Encoding UTF8
