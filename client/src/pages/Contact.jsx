import React from 'react';

export default function Contact() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Salon Information</h2>
          <address className="not-italic">
            <p className="mb-2"><strong>Address:</strong> 123 Grooming St, Hairville</p>
            <p className="mb-2"><strong>Phone:</strong> (555) 123-4567</p>
            <p className="mb-2"><strong>Email:</strong> contact@salonbooking.com</p>
            <p><strong>Hours:</strong> Mon-Sat: 9AM - 7PM</p>
          </address>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Message</label>
              <textarea className="w-full p-2 border rounded" rows="4"></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
