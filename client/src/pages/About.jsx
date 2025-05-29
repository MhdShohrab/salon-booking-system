import React from 'react';
import salonImage from '../assets/css/images/haircut8.jpg'; // Import the image

export default function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">About Our Salon</h1>
          
          {/* Image div - added below */}
          <div className="about-image-container">
            <img 
              src={salonImage} 
              alt="Our salon interior" 
              className="about-image"
            />
          </div>
          
          <p>
            We are a premium men's grooming salon specializing in modern haircuts,
            beard styling, and relaxation services.
          </p>
          <p>
            Founded in 2023, our mission is to provide exceptional grooming
            services in a comfortable, hygienic environment.
          </p>
        </div>
      </div>
    </section>
  );
}