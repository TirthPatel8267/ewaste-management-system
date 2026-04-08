import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!; // 🔥 NO fallback

// 🔐 Generate Token
export function signToken(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

// 🔓 Verify Token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    console.log("JWT ERROR:", err);
    return null;
  }
}