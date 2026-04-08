"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const centers = [
  {
    name: "Green Earth Recycling",
    city: "Ahmedabad",
    address: "Ahmedabad, Gujarat",
    phone: "9876543210",
    map: "https://maps.google.com?q=Ahmedabad&output=embed",
  },
  {
    name: "Eco Waste Solutions",
    city: "Surat",
    address: "Surat, Gujarat",
    phone: "9123456780",
    map: "https://maps.google.com?q=Surat&output=embed",
  },
  {
    name: "Recycle Hub",
    city: "Vadodara",
    address: "Vadodara, Gujarat",
    phone: "9988776655",
    map: "https://maps.google.com?q=Vadodara&output=embed",
  },
];

export default function Centers() {
  const [city, setCity] = useState("");

  const filtered = city
    ? centers.filter((c) => c.city === city)
    : centers;

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-green-50 to-white p-10">

      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        🌍 Recycling Centers
      </h1>

      {/* Filter */}
      <div className="max-w-md mx-auto mb-8">
        <select
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded-xl"
        >
          <option value="">All Cities</option>
          <option>Ahmedabad</option>
          <option>Surat</option>
          <option>Vadodara</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-8">

        {filtered.map((center, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-2xl overflow-hidden"
          >

            {/* Map */}
            <iframe
              src={center.map}
              className="w-full h-48 border-0"
              loading="lazy"
            ></iframe>

            <div className="p-6">

              <h2 className="text-xl font-bold mb-2">
                {center.name}
              </h2>

              <p className="flex items-center gap-2 text-gray-600 mb-2">
                <FaMapMarkerAlt /> {center.address}
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <FaPhoneAlt /> {center.phone}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${center.city}`}
                  target="_blank"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700"
                >
                  Directions
                </a>

                <button className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50">
                  Contact
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}