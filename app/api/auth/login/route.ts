import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // 🔍 Find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found ❌",
      });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid password ❌",
      });
    }

    // 🎟 Create JWT
    const token = signToken({
      id: user._id,
      role: user.role,
    });

    const res = NextResponse.json({
      success: true,
      role: user.role,
      message: "Login successful ✅",
    });

    // 🍪 Save cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure:process.env.NODE_ENV === "production",
    });

    return res;

  } catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json({
      success: false,
      message: "Server error ❌",
    });
  }
}