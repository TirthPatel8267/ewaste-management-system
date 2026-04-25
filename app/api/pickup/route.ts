import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";
import { sendStatusEmail } from "@/lib/mail";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("Sending email to:", body.email); 

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    let userId = null;

    if (token) {
      const decoded = verifyToken(token);
      if (decoded && decoded.id) {
        userId = decoded.id;
      }
    }

    const pickup = await Pickup.create({
      ...body,
      userId,
      status: "Pending",
      location: {
        lat: 23.0225,
        lng: 72.5714,
      },
    });

    // ✅ SEND EMAIL TO USER
    await sendStatusEmail(body.email,pickup);

    return Response.json({ success: true, pickup });

  } catch (error) {
    console.error("Pickup Error:", error);

    return Response.json({
      success: false,
      message: "Pickup failed ❌",
    });
  }
}