"use client";

import { FaRecycle, FaLeaf, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-green-50 to-white p-10">

      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">
          About E-Waste Management ♻
        </h1>

        <p className="text-gray-600 text-center mb-10">
          Our platform helps users responsibly recycle electronic waste and
          contribute to a greener environment.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
            <FaRecycle className="text-4xl text-green-500 mx-auto mb-3" />
            <h2 className="font-bold text-lg mb-2">Recycling</h2>
            <p className="text-gray-500">
              We ensure proper disposal and recycling of electronic waste.
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
            <FaLeaf className="text-4xl text-green-500 mx-auto mb-3" />
            <h2 className="font-bold text-lg mb-2">Eco-Friendly</h2>
            <p className="text-gray-500">
              Our mission is to reduce environmental pollution and save nature.
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
            <FaUsers className="text-4xl text-green-500 mx-auto mb-3" />
            <h2 className="font-bold text-lg mb-2">Community</h2>
            <p className="text-gray-500">
              Join our growing community to make a sustainable impact.
            </p>
          </div>

        </div>

        {/* Extra Section */}
        <div className="mt-12 bg-green-100 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-3">
            🌍 Our Mission
          </h2>
          <p className="text-gray-600">
            To create a cleaner, greener future by promoting responsible e-waste
            recycling and awareness among people.
          </p>
        </div>

      </div>
    </div>
  );
}