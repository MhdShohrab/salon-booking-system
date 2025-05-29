// HeroSection.jsx
// Home page slider.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/css/images/haircut8.jpg';
import image2 from '../assets/css/images/haircut7.jpg';
import image3 from '../assets/css/images/haircut6.jpg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [image1, image2, image3];
  const navigate = useNavigate();

  // Auto-slide that runs continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleBookNow = () => {
    navigate('/book-appointment');
  };

  return (
    <section className="hero-slider">
      {/* Slides */}
      <div className="slides-container">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="slide-overlay"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        <h1>WELCOME TO Mhd SALON</h1>
        <p>Book your perfect haircut experience</p>
        <button onClick={handleBookNow}>BOOK NOW</button>
      </div>

      {/* Navigation Arrows */}
      <button className="arrow prev" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="arrow next" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}