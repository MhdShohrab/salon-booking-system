import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="header">
      <div className="navbar">
        {/* <Link to="/" className="salonName">Salon Booking</Link> */}
      <div className="navbrand">
        <h1 className="mhd" >Mhd</h1>
        <h1 className="salon">S A L O N</h1>
      </div>
        
      <div className="navlinks">
          <Link to="/" className="hover:text-blue-200 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-200 transition">About</Link>
          <Link to="/services" className="hover:text-blue-200 transition">Services</Link>
          <Link to="/contact" className="hover:text-blue-200 transition">Contact</Link>
          
          {currentUser ? (
            <>
              <Link to="/my-appointments" className="hover:text-blue-200 transition">My Bookings</Link>
              <button 
                onClick={logout}
                className="hover:text-blue-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-200 transition">Register</Link>
            </>
          )}
      </div>
      </div>
    </nav>
  );
}