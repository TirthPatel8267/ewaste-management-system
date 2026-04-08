"use client";
export default function StatCard({title,value,color}:any){

  return(

    <div data-aos="fade-up"className="bg-white shadow rounded-lg p-6">

      <h3 className="text-gray-500 mb-2">
        {title}
      </h3>

      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>

    </div>

  );
}