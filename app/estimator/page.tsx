"use client";

import { useState } from "react";

export default function PriceEstimator() {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    let base = 0;

    // CATEGORY BASE PRICE
    switch (category) {
      case "Laptop":
        base = 8000;
        break;
      case "Mobile":
        base = 5000;
        break;
      case "Battery":
        base = 1500;
        break;
      case "Printer":
        base = 3000;
        break;
      default:
        base = 1000;
    }

    // CONDITION FACTOR
    let conditionFactor = 1;
    if (condition === "Good") conditionFactor = 1;
    if (condition === "Average") conditionFactor = 0.7;
    if (condition === "Bad") conditionFactor = 0.4;

    // AGE FACTOR
    let ageFactor = 1;
    if (age === "0-1") ageFactor = 1;
    if (age === "1-3") ageFactor = 0.8;
    if (age === "3+") ageFactor = 0.5;

    const finalPrice = Math.round(base * conditionFactor * ageFactor);

    setPrice(finalPrice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 space-y-6 border border-gray-200">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-green-600">
          💰 Price Estimator
        </h1>

        {/* CATEGORY */}
        <div>
          <label className="block mb-2 font-medium">Device Type</label>
          <select
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            <option>Laptop</option>
            <option>Mobile</option>
            <option>Battery</option>
            <option>Printer</option>
          </select>
        </div>

        {/* CONDITION */}
        <div>
          <label className="block mb-2 font-medium">Condition</label>
          <select
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">Select</option>
            <option>Good</option>
            <option>Average</option>
            <option>Bad</option>
          </select>
        </div>

        {/* AGE */}
        <div>
          <label className="block mb-2 font-medium">Age</label>
          <select
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="">Select</option>
            <option value="0-1">0 - 1 Year</option>
            <option value="1-3">1 - 3 Years</option>
            <option value="3+">3+ Years</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          onClick={calculatePrice}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
        >
          Calculate Price
        </button>

        {/* RESULT */}
        {price !== null && (
          <div className="mt-6 text-center bg-green-50 border border-green-200 p-6 rounded-2xl shadow-inner">

            <p className="text-gray-500 mb-2">
              Estimated Recycling Value
            </p>

            <h2 className="text-4xl font-bold text-green-600">
              ₹ {price.toLocaleString()}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              *Final price may vary based on inspection
            </p>

          </div>
        )}

      </div>

    </div>
  );
}