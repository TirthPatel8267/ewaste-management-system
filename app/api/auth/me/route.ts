import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user });
}