import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("Sending email to:", body.email); 

    const pickup = await Pickup.create({
      ...body,
      status: "Pending",
      location: {
        lat: 23.0225,
        lng: 72.5714,
      },
    });

    // ✅ SEND EMAIL TO USER
    await sendEmail(body.email, body);

    return Response.json({ success: true, pickup });

  } catch (error) {
    console.error("Pickup Error:", error);

    return Response.json({
      success: false,
      message: "Pickup failed ❌",
    });
  }
}