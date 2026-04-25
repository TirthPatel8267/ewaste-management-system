import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const decoded = verifyToken(token);

  if (!decoded || !decoded.id) {
    return NextResponse.json({ user: null });
  }

  try {
    await connectDB();
    const dbUser = await User.findById(decoded.id).select("name email role points");
    
    if (!dbUser) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ 
      user: {
        id: dbUser._id,
        name: dbUser.name || null,
        email: dbUser.email,
        role: dbUser.role,
        points: dbUser.points
      } 
    });
  } catch (error) {
    console.error("Fetch user error:", error);
    return NextResponse.json({ user: null });
  }
}