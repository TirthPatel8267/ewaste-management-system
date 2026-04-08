import nodemailer from "nodemailer";

export async function sendEmail(to: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tirthpatel8267@gmail.com", // 🔥 replace
      pass: "btat wzgi nlgv olnw",   // 🔥 replace
    },
  });

  await transporter.sendMail({
    from: "E-Waste System",
    to,
    subject: "Pickup Request Submitted ♻",
    text: "Your pickup request has been successfully submitted ✅",
  });
}