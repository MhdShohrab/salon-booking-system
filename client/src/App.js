// frontend setup

// # First terminal (backend)
// cd server
// nodemon server.js

// # Second terminal (frontend)
// cd ..\client
// npm start or nodemon start


import React from 'react';

import './assets/css/main.scss'; // This imports all your CSS
import './assets/scss/main.scss';

import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import SalonCard from './components/SalonCard';
import ServiceCard from './components/ServiceCard';
import ServiceSelection from './components/ServiceSelection';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import About from './pages/About';
import BookAppointment from './pages/BookAppointment';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SalonDetail from './pages/SalonDetail';
import Services from './pages/Services';
import UserAppointments from './pages/UserAppointments';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/salons/:id" element={<SalonDetail />} />
              
              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/my-appointments" element={<UserAppointments />} />
              </Route>
            </Routes>
          </main>
          <ToastContainer 
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;