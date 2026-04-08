"use client";

import { useState } from "react";

export default function Estimator() {
  const [category, setCategory] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [bill, setBill] = useState("yes");
  const [fault, setFault] = useState("");
  const [result, setResult] = useState<any>(null);

  const basePrices: any = {
    Laptop: 40000,
    Mobile: 20000,
    Batteries: 5000,
    Printer: 15000,
    Other: 8000,
  };

  const calculatePrice = () => {
    if (!category || !purchaseDate) {
      return alert("Fill all fields ❌");
    }

    const base = basePrices[category];

    // 📅 Calculate age
    const purchaseYear = new Date(purchaseDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - purchaseYear;

    // depreciation (10% per year)
    let depreciated = base - base * (0.1 * age);

    // bill bonus
    if (bill === "yes") {
      depreciated += 500;
    }

    // fault deduction
    if (fault.length > 10) {
      depreciated -= 1000;
    }

    if (depreciated < 500) depreciated = 500;

    setResult({
      estimated: Math.round(depreciated * 0.3),
      original: base,
      resale: Math.round(depreciated),
    });
  };

  return (
    <div className="ml-64 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl space-y-6">

        <h2 className="text-3xl font-bold text-green-600">
          💰 Price Estimator
        </h2>

        {/* Category */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-xl"
        >
          <option value="">Select Item</option>
          <option>Laptop</option>
          <option>Mobile</option>
          <option>Batteries</option>
          <option>Printer</option>
          <option>Other</option>
        </select>

        {/* Purchase Date */}
        <input
          type="date"
          onChange={(e) => setPurchaseDate(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        {/* Bill Available */}
        <div className="flex gap-4">
          <button
            onClick={() => setBill("yes")}
            className={`flex-1 p-3 rounded-xl ${
              bill === "yes"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Yes
          </button>

          <button
            onClick={() => setBill("no")}
            className={`flex-1 p-3 rounded-xl ${
              bill === "no"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
          >
            No
          </button>
        </div>

        {/* Fault */}
        <textarea
          placeholder="Fault Description"
          onChange={(e) => setFault(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />

        {/* Button */}
        <button
          onClick={calculatePrice}
          className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
        >
          Get Estimate
        </button>

        {/* Result */}
        {result && (
          <div className="grid grid-cols-3 gap-4 text-center bg-green-50 p-5 rounded-xl">

            <div>
              <p className="text-gray-500">Estimated</p>
              <h3 className="text-xl font-bold text-green-600">
                ₹ {result.estimated}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Original Cost</p>
              <h3 className="text-xl font-bold">
                ₹ {result.original}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Resale Price</p>
              <h3 className="text-xl font-bold text-blue-600">
                ₹ {result.resale}
              </h3>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}