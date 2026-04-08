import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function DELETE(req: Request) {
  await connectDB();

  const { id } = await req.json();

  await Pickup.findByIdAndDelete(id);

  return Response.json({ success: true });
}