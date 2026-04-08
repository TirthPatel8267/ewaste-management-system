import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function POST(req: Request) {
  await dbConnect();

  const { lat, lng } = await req.json();

  console.log("📡 Incoming location:", lat, lng);

  // ✅ Find latest pickup which is NOT completed
  const pickup = await Pickup.findOne({ status: { $ne: "Completed" } }).sort({
    _id: -1,
  });

  if (!pickup) {
    console.log("❌ No active pickup found");
    return NextResponse.json({ success: false });
  }

  // ✅ Update location
  pickup.location = { lat, lng };
  await pickup.save();

  console.log("✅ DB Updated:", pickup.location);

  return NextResponse.json({ success: true });
}