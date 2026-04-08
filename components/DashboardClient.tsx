"use client";

import Sidebar from "@/components/Sidebar";
import PickupChart from "@/components/PickupChart";
import DeviceChart from "@/components/DeviceChart";
import { FaRecycle, FaClock, FaCheckCircle } from "react-icons/fa";
import CountUp from "react-countup";

export default function DashboardClient() {
  return (
  <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-gray-100">

      <Sidebar />

      <div className="ml-64 p-10 w-full">

        <div className="mb-10">
<h1 className="text-3xl font-bold">
Welcome back 👋
</h1>

<p className="text-gray-500">
Here is the overview of your e-waste recycling activity.
</p>
</div>

        

{/* Stats */}

<div className="grid md:grid-cols-3 gap-8 mb-10">
  

{/* Total Requests */}

<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">

<div className="flex items-center justify-between">

<div>
<p className="text-gray-500">Total Requests</p>

<h2 className="text-4xl font-bold text-green-600">
<CountUp end={24} duration={2} />
</h2>
</div>

<FaRecycle className="text-4xl text-green-500" />

</div>

</div>


{/* Pending */}

<div className="bg-white/70 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition">

<div className="flex items-center justify-between">

<div>
<p className="text-gray-500">Pending Pickups</p>

<h2 className="text-4xl font-bold text-yellow-500">
<CountUp end={8} duration={2} />
</h2>
</div>

<FaClock className="text-4xl text-yellow-500" />

</div>

</div>


{/* Completed */}

<div className="bg-white/70 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition">

<div className="flex items-center justify-between">

<div>
<p className="text-gray-500">Completed Recycling</p>

<h2 className="text-4xl font-bold text-blue-600">
<CountUp end={16} duration={2} />
</h2>
</div>

<FaCheckCircle className="text-4xl text-blue-600" />

</div>

</div>

</div>

        {/* Line Chart */}
<div className="grid md:grid-cols-2 gap-6 mb-10">

<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-xl font-semibold mb-4">
Pickup Statistics
</h2>

<PickupChart />

</div>


<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-xl font-semibold mb-4">
Device Types
</h2>

<DeviceChart />

</div>

</div>
{/* Eco Impact Tracker */}

<div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 text-white p-8 rounded-2xl shadow-lg mb-10">

<h2 className="text-2xl font-bold mb-6">
🌍 Environmental Impact
</h2>

<div className="grid md:grid-cols-3 gap-6 text-center">

<div>
<FaRecycle className="text-3xl mx-auto mb-2" />
<p>Devices Recycled</p>
<h3 className="text-4xl font-bold">2,450+</h3>
</div>

<div>
<p className="text-lg">CO₂ Emissions Saved</p>
<h3 className="text-4xl font-bold">
<CountUp end={1.8} decimals={1} duration={3} /> Tons
</h3>
</div>

<div>
<p className="text-lg">Metals Recovered</p>
<h3 className="text-4xl font-bold">
<CountUp end={320} duration={3} /> Kg
</h3>
</div>

</div>

</div>

        {/* Table */}

      <div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-xl font-semibold mb-4">
Recent Pickup Requests
</h2>

<div className="overflow-x-auto">

<table className="w-full text-left">

<thead className="bg-gray-100">

<tr>
<th className="p-3">User</th>
<th className="p-3">Device</th>
<th className="p-3">Status</th>
</tr>

</thead>

<tbody>

<tr className="border-b hover:bg-gray-50">
<td className="p-3">John</td>
<td>Laptop</td>
<td className="text-yellow-500">Pending</td>
</tr>

<tr className="border-b hover:bg-gray-50">
<td className="p-3">Sarah</td>
<td>Mobile</td>
<td className="text-green-600">Completed</td>
</tr>

<tr className="hover:bg-gray-50">
<td className="p-3">Mike</td>
<td>Printer</td>
<td className="text-blue-600">Scheduled</td>
</tr>

</tbody>

</table>

</div>

</div>
</div>
</div>
  );
}