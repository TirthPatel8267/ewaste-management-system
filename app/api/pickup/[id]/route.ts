import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function GET(_: Request, { params }: any) {
  await connectDB();

  const pickup = await Pickup.findById(params.id);

  return Response.json(pickup);
}