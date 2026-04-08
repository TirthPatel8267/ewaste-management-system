"use client";

import { useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

export default function AIPage() {
  const [image, setImage] = useState<any>(null);
  const [result, setResult] = useState("");
  const [price, setPrice] = useState<any>(null);

  const handleDetect = async () => {
  if (!image) return;

  const imgElement = document.getElementById("preview") as HTMLImageElement;
  if(!imgElement) return;

  const model = await mobilenet.load();
  const predictions = await model.classify(imgElement);

  const detected = predictions[0].className.toLowerCase();

  setResult(
    `Detected: ${predictions[0].className} (${Math.round(
      predictions[0].probability * 100
    )}%)`
  );

  // 💰 PRICE LOGIC
  if (detected.includes("phone")) {
    setPrice({
      estimated: 5000,
      scrap: 800,
      resale: 4200,
      suggestion: "Resell recommended 📱",
    });
  } else if (detected.includes("laptop")) {
    setPrice({
      estimated: 15000,
      scrap: 2000,
      resale: 13000,
      suggestion: "High resale value 💻",
    });
  } else if (detected.includes("battery")) {
    setPrice({
      estimated: 500,
      scrap: 300,
      resale: 200,
      suggestion: "Recycle safely 🔋",
    });
  } else {
    setPrice({
      estimated: 1000,
      scrap: 200,
      resale: 800,
      suggestion: "General electronic item ♻",
    });
  }
};
  return (
    <div className="ml-64 p-10">

      <h1 className="text-3xl font-bold mb-6">
        🤖 AI Waste Detection (Real ML)
      </h1>

      <div className="glass p-8 max-w-xl">

        {/* Upload */}
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e: any) =>
            setImage(URL.createObjectURL(e.target.files[0]))
          }
        />

        {/* Preview */}
        {image && (
          <img
            id="preview"
            src={image}
            className="w-full h-60 object-cover rounded-xl mb-4"
          />
        )}

        {/* Button */}
        <button
          onClick={handleDetect}
          className="w-full bg-green-600 text-white py-3 rounded-xl"
        >
          Detect Waste
        </button>

        {/* Result */}
        {result && (
          <p className="mt-4 text-lg font-semibold text-green-600">
            {result}
          </p>
        )}
        {price && (
  <div className="mt-6 p-4 bg-green-50 rounded-xl">
    
    <h3 className="text-lg font-bold mb-2">
      💰 Price Estimation
    </h3>

    <p>Estimated Price: ₹{price.estimated}</p>
    <p>Scrap Value: ₹{price.scrap}</p>
    <p>Resale Value: ₹{price.resale}</p>

    <p className="mt-2 text-green-600 font-semibold">
      💡 {price.suggestion}
    </p>

  </div>
)}

      </div>

    </div>
  );
}