import connectDB from "@/lib/db";
import WasteRequest from "@/models/WasteRequest";

export async function GET(){

  await connectDB();

  const requests = await WasteRequest.find();

  return Response.json({
    success:true,
    requests
  });

}