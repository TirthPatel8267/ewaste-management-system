"use client";

import { useEffect, useState } from "react";

export default function TrackPage({ params }: any) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/pickup/${params.id}`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold text-green-600">
        🚚 Pickup Status
      </h2>

      <p className="mt-4">Status: <b>{data.status}</b></p>
    </div>
  );
}