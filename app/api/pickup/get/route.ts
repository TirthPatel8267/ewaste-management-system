import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function GET() {
  await connectDB();

  const data = await Pickup.find().sort({ createdAt: -1 });

  return Response.json(data);
}