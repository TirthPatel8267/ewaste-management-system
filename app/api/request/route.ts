import connectDB from "@/lib/db";
import WasteRequest from "@/models/WasteRequest";

export async function POST(req: Request){

  await connectDB();

  const {userId,wasteType,address,pickupDate} = await req.json();

  const request = await WasteRequest.create({
    userId,
    wasteType,
    address,
    pickupDate
  });

  return Response.json({
    success:true,
    request
  });

}