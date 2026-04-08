import connectDB from "@/lib/db";
import WasteRequest from "@/models/WasteRequest";

export async function POST(req: Request){

  await connectDB();

  const {userId} = await req.json();

  const requests = await WasteRequest.find({userId});

  return Response.json({
    success:true,
    requests
  });

}