//3rd div(Home.jsx, _grid.scss)
import React from 'react';
import haircutImg1 from '../assets/css/images/haircut1.jpg'; // adjust path accordingly
import haircutImg2 from '../assets/css/images/haircut2.jpg';
import haircutImg3 from '../assets/css/images/haircut3.jpg';
import haircutImg4 from '../assets/css/images/haircut1.jpg';
import haircutImg5 from '../assets/css/images/haircut2.jpg';
import haircutImg6 from '../assets/css/images/haircut3.jpg';

export default function ServiceCard({ service }) {
  const serviceImages = {
    Haircut: haircutImg1,
    "Beard Trim": haircutImg2,
    Facial: haircutImg3,
    Massage: haircutImg4,
    "Head Massage": haircutImg4,
    "Hair Color": haircutImg5,
  };

  const descriptions = {
    Haircut: "A professional haircut tailored to enhance your look and boost confidence.",
    "Beard Trim": "Style and shape your beard for a clean and sharp appearance.",
    Facial: "Deep cleansing treatment that rejuvenates your skin and enhances glow.",
    Massage: "Relieve stress and improve blood circulation with a relaxing massage.",
    "Head Massage": "A soothing head massage to relieve stress and improve blood circulation.",
    "Hair Color": "Get vibrant and stylish hair color using safe, ammonia-free products.",
  };

  return (
    <div className="service-card">
      <img
        src={serviceImages[service.name] || haircutImg6}
        alt={service.name}
        className="card-img"
      />
      <div className="card-body">
        <h3 className="card-title">{service.name}</h3>
        <div className="card-text">
          ₹{service.price || 150} | {service.duration || 30} mins
        </div>
        <p>{descriptions[service.name]}</p>
      </div>
    </div>
  );
}