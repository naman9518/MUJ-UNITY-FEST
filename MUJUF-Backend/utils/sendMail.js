import dotenv from "dotenv/config";
import nodemailer from "nodemailer";

const sendMail = async (
  receiverEmail,
  subject,
  htmlContent,
  replyTo = null
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_SECURE === "true",
    auth: {
      user: process.env.NODEMAILER_EMAIL_USER,
      pass: process.env.NODEMAILER_EMAIL_PASS,
    },
  });

  const message = {
    from: process.env.NODEMAILER_EMAIL_USER, // Gmail verified sender
    to: receiverEmail, // Usually also your Gmail
    subject,
    html: htmlContent, // HTML content rendered correctly
    ...(replyTo && { replyTo }), // Only include replyTo if passed
  };

  const mailResponse = await transporter.sendMail(message);
  return mailResponse;
};

export default sendMail;
