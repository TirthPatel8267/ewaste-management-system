import connectDB from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
        return Response.json({ success: false });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    await sendEmail(email, {
        subject: "Reset Password",
        html: `
      <h2>Password Reset</h2>
      <p>Click below:</p>
      <a href="${resetLink}">Reset Password</a>
    `,
    });

    return Response.json({ success: true });
}