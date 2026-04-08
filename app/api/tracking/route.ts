import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function GET() {
  await dbConnect();

  const pickup = await Pickup.findOne().sort({ _id: -1 });

  return NextResponse.json(pickup);
}