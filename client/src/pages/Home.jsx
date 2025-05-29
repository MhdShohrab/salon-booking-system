// Home.jsx
// Renders homepage UI and calls API to get nearby salons
// jo nearby saloon ka response aaega wo finally isi page ke help se show kiya jaega, isme jo useEffect funstion h wo wahi kaam kr rha h.
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ServiceCard from "../components/ServiceCard";
import SalonCard from "../components/SalonCard";
import NearSalon from "../components/Nearsalon";
import axios from "axios";

const Home = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [services] = useState([
    {
      id: 1,
      name: "Haircut",
      icon: "✂️",
      image: "/images/haircut.jpg",
      price: 150,
      duration: 30,
      description:
        "A fresh haircut not only boosts confidence but defines your style and personality.",
    },
    {
      id: 2,
      name: "Beard Trim",
      icon: "🧔",
      image: "/images/beard.jpg",
      price: 100,
      duration: 20,
      description:
        "Sharp beard trims refine your look, enhancing facial symmetry and charm.",
    },
    {
      id: 3,
      name: "Facial",
      icon: "🧖‍♂️",
      image: "/images/facial.jpg",
      price: 500,
      duration: 45,
      description:
        "Facials rejuvenate your skin, giving a clean and glowing appearance.",
    },
    {
      id: 4,
      name: "Massage",
      icon: "💆‍♂️",
      image: "/images/massage.jpg",
      price: 600,
      duration: 60,
      description:
        "Relaxing massage therapy reduces stress and enhances skin and muscle tone.",
    },
    {
      id: 5,
      name: "Head Massage",
      icon: "💆‍♂️",
      image: "/images/head-massage.jpg",
      price: 400,
      duration: 30,
      description:
        "A soothing head massage to relieve stress and improve blood circulation.",
    },
    {
      id: 6,
      name: "Hair Color",
      icon: "🎨",
      image: "/images/hair-color.jpg",
      price: 800,
      duration: 90,
      description:
        "Get vibrant and stylish hair color using safe, ammonia-free products.",
    },
  ]);

  useEffect(() => {
    const fetchSalons = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // ✅ Use full backend URL like NearSalon.jsx
            const response = await axios.get(
              `http://localhost:5000/api/salons/nearby?latitude=${latitude.toFixed(
                6
              )}&longitude=${longitude.toFixed(6)}`
            );
            setSalons(response.data);
            setLoading(false);
          } catch (err) {
            console.error("Failed to fetch salons:", err);
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation permission denied:", error);
          setLoading(false);
        }
      );
    };

    fetchSalons();
  }, []);

  return (
    <div>
      <HeroSection />
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="services-container">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <NearSalon />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nearby Salons</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salons.slice(0, 6).map((salon) => (
                <SalonCard key={salon._id} salon={salon} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/book-appointment" className="btn btn-primary">
              Book Appointment Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
