"use client";

import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DeviceChart(){
    <div className="w-[320px] mx-auto">
  <DeviceChart />
</div>

const data = {
labels: ["Laptops","Mobiles","Printers","Others"],
datasets:[
{
label:"Devices",
data:[12,19,7,5],
backgroundColor:[
"#16a34a",
"#3b82f6",
"#f59e0b",
"#ef4444"
]
}
]
};

return <Pie data={data} />;
}