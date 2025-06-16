// 4th div of home section(near by saloon)
// Shows list of nearby salons using geolocation
// client/src/components/NearSalon.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/sections/_HomeServices.scss"; // SCSS styles

const NearSalon = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if browser supports geolocation
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("User location:", latitude, longitude); // ✅ LOGGING for debugging

        try {
          // Make sure coordinates are sent as float numbers with limited decimals
          const res = await axios.get(
            `http://localhost:5000/api/salons/nearby?latitude=${latitude.toFixed(6)}&longitude=${longitude.toFixed(6)}`
          );
          
          console.log("API Response:", res.data); // Log the API response
       
          if (res.data && res.data.length > 0) {
            setSalons(res.data.slice(0, 6)); // Show first 6 salons
          } else {
            setError("No salons found nearby. Please try again later.");
          }
        } catch (err) {
          console.error("API fetch error:", err);
          setError("Failed to fetch nearby salons: " + (err.response?.data?.message || err.message));
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        console.error("Geolocation error:", geoError);
        setError("Permission denied or failed to get location.");
        setLoading(false);
      }
    );
  }, []);

  if (loading)
    return <div className="text-center">Loading nearby salons...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="our-services-heading">Nearby Salons</h2>
        {salons.length === 0 ? (
          <div className="text-center">No nearby salons found.</div>
        ) : (
          <div className="services-container">
            {salons.map((salon) => (
              <div key={salon._id} className="service-card">
                <img
                  src={salon.image || "/images/default-salon.jpg"}
                  alt={salon.name}
                  className="card-img"
                />
                <div className="card-body">
                  <h3 className="card-title">{salon.name}</h3>
                  <div className="card-text">
                    📏 {(salon.distance / 1000).toFixed(2)} km away
                  </div>
                  <p>{salon.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NearSalon;
