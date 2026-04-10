import nodemailer from "nodemailer";

export async function sendEmail(to: string, pickupData: any) {
  try {
    console.log("ENV CHECK:", process.env.EMAIL_USER);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // 🔥 IMPORTANT
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"E-Waste System" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "📦 Pickup Request Confirmed",
      html: `
        <h2>Pickup Confirmed ✅</h2>
        <p>Name: ${pickupData.name}</p>
        <p>Address: ${pickupData.address}</p>
        <p>Date: ${pickupData.date}</p>
      `,
    });

    console.log("EMAIL SENT:", info.messageId);

  } catch (error) {
    console.error("EMAIL ERROR:", error);
  }
}