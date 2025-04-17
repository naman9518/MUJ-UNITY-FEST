import dotenv from "dotenv/config";
import nodemailer from "nodemailer";
const sendMail = async (receiverEmail, subject, mailContent) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_SECURE,
    auth: {
      user: process.env.NODEMAILER_EMAIL_USER,
      pass: process.env.NODEMAILER_EMAIL_PASS,
    },
  });

  const message = {
    from: process.env.NODEMAILER_EMAIL_USER,
    to: receiverEmail,
    subject: subject,
    text: mailContent,
  };
  const mailResponse = await transporter.sendMail(message);
  return mailResponse;
};
export default sendMail;
