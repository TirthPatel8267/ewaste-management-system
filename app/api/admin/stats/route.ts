import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function GET() {
  await dbConnect();

  const total = await Pickup.countDocuments();

  const pending = await Pickup.countDocuments({ status: "Pending" });
  const approved = await Pickup.countDocuments({ status: "Approved" });
  const completed = await Pickup.countDocuments({ status: "Completed" });
  const daily = await Pickup.countDocuments({
  createdAt: {
    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
  },
});

const weekly = await Pickup.countDocuments({
  createdAt: {
    $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
});

const monthly = await Pickup.countDocuments({
  createdAt: {
    $gte: new Date(new Date().setDate(1)),
  },
});

  return NextResponse.json({
    total,
    pending,
    approved,
    completed,
    daily,
    weekly,
    monthly,

  });
}