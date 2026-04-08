import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function POST(req: Request) {
  await connectDB();

  const { id } = await req.json();

  await Pickup.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}