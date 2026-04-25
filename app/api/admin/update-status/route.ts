import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";
import { sendStatusEmail } from "@/lib/mail";

export async function POST(req: Request) {
  await connectDB();

  const { id, status } = await req.json();

  const pickup = await Pickup.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!pickup) {
    return Response.json({ success: false, error: "Pickup not found" }, { status: 404 });
  }

  // 🔥 SEND STATUS EMAIL
  await sendStatusEmail(pickup.email, pickup);

  return Response.json({ success: true });
}