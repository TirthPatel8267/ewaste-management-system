import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function GET() {
  await connectDB();

  const pickups = await Pickup.find().sort({ createdAt: -1 }).limit(20);

  return Response.json({ pickups });
}