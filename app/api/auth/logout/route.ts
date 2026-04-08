import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // ❌ REMOVE COOKIE
  res.cookies.set("token", "", {
    expires: new Date(0),
  });

  return res;
}