import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function POST(req: Request) {
  await dbConnect();

  const { id, status } = await req.json();

  await Pickup.findByIdAndUpdate(id, { status });

  return NextResponse.json({ success: true });
}