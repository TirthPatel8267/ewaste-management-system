import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";
import {sendEmail} from "@/lib/mail";

export async function POST(req: Request) {
  await connectDB();
  await sendEmail("tirthpatel8267@gmail.com");

  const body = await req.json();

  const pickup = await Pickup.create({
    ...body,
  status: "Pending",
location:{
  lat:23.0225,
  lng:72.5714,
},
});

  return Response.json({ success: true, pickup });
}