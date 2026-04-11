import nodemailer from "nodemailer";
export async function sendEmail(to: string, pickupData: any) {
  // your email logic
}

export async function sendStatusEmail(to: string, pickupData: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = `
<div style="font-family: Arial; background:#f4f6f8; padding:20px;">
  <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">

    <div style="background:#16a34a; color:white; padding:20px; text-align:center;">
      <h2>♻ E-Waste Management</h2>
      <p>Pickup Request Confirmed</p>
    </div>

    <div style="padding:20px;">
      <h3>Hello ${pickupData.name} 👋</h3>

      <p>Your pickup request is successfully submitted.</p>

      <p><strong>📦 Category:</strong> ${pickupData.category}</p>
      <p><strong>📍 Address:</strong> ${pickupData.address}</p>
      <p><strong>📅 Date:</strong> ${pickupData.date}</p>
      <p><strong>⏰ Time:</strong> ${pickupData.time}</p>

      <!-- 🔥 TRACK BUTTON -->
      <div style="text-align:center; margin-top:20px;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/track/${pickupData._id}"
          style="background:#16a34a; color:white; padding:12px 20px; text-decoration:none; border-radius:8px;">
          🚚 Track Pickup
        </a>
      </div>
    </div>

    <div style="background:#f1f1f1; text-align:center; padding:10px;">
      © 2026 E-Waste Management
    </div>

  </div>
</div>
`;

    // ✅ SEND TO USER
    await transporter.sendMail({
      from: `"E-Waste System" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "✅ Pickup Request Confirmed",
      html: htmlTemplate,
    });

    // ✅ SEND TO ADMIN
    await transporter.sendMail({
      from: `"E-Waste System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // admin email
      subject: "📢 New Pickup Request",
      html: `
        <h2>New Pickup Request 🚨</h2>
        <p><strong>Name:</strong> ${pickupData.name}</p>
        <p><strong>Email:</strong> ${pickupData.email}</p>
        <p><strong>Phone:</strong> ${pickupData.phone}</p>
        <p><strong>Address:</strong> ${pickupData.address}</p>
      `,
    });

    console.log("Emails sent successfully ✅");
  } catch (error) {
    console.error("Email Error:", error);
  }
}