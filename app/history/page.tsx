"use client";

import { useEffect, useState } from "react";

export default function History(){

  const [requests,setRequests] = useState([]);

  useEffect(()=>{
    fetchHistory();
  },[]);

  const fetchHistory = async ()=>{

    const res = await fetch("/api/user/requests",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        userId:"demoUser"
      })
    });

    const data = await res.json();

    setRequests(data.requests);

  }

  return(

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Pickup Requests
      </h1>

      <table className="border w-full">

        <thead>

          <tr className="border">
            <th className="border p-2">Waste Type</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Pickup Date</th>
            <th className="border p-2">Status</th>
          </tr>

        </thead>

        <tbody>

        {requests.map((r:any)=>(
          <tr key={r._id} className="border">

            <td className="border p-2">{r.wasteType}</td>
            <td className="border p-2">{r.address}</td>
            <td className="border p-2">{r.pickupDate}</td>
            <td className="border p-2">{r.status}</td>

          </tr>
        ))}

        </tbody>

      </table>

    </div>

  );

}