import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";
import { sendStatusEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id, status } = await req.json();

    const pickup = await Pickup.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // 📧 Send email when status changes
    if (pickup?.email) {
      await sendStatusEmail(pickup.email, pickup);
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false });
  }
}