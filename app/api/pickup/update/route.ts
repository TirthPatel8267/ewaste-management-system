import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function PUT(req: Request) {
  await connectDB();

  const { id, status } = await req.json();

  await Pickup.findByIdAndUpdate(id, { status });

  return Response.json({ success: true });
}