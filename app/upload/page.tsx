"use client";

import { useState } from "react";

export default function Upload(){

  const [image,setImage] = useState<any>(null);

  const handleUpload = async ()=>{

    const formData = new FormData();
    formData.append("file",image);

    const res = await fetch("/api/upload",{
      method:"POST",
      body:formData
    });

    const data = await res.json();

    if(data.success){
      alert("Image Uploaded");
    }

  }

  return(

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Upload E-Waste Image
      </h1>

      <input
      type="file"
      onChange={(e:any)=>setImage(e.target.files[0])}
      />

      <button
      onClick={handleUpload}
      className="ml-4 bg-green-600 text-white p-2"
      >
        Upload
      </button>

    </div>

  );

}