import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password, role} = await req.json();

  // ✅ CHECK IF USER EXISTS
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { success: false, message: "Email already registered ❌" },
      { status: 400 }
    );
  }

  // ✅ HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ CREATE USER
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return NextResponse.json({
    success: true,
    message: "User registered successfully ✅",
  });
}