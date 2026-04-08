import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function GET() {
  await connectDB();

  const data = await Pickup.find();

  return NextResponse.json(data);
}