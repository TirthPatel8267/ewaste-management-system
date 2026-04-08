import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function POST(req: Request) {
  await connectDB();

  const { id, status } = await req.json();

  await Pickup.findByIdAndUpdate(id, { status });

  return NextResponse.json({ success: true });
}