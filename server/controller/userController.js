import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/customError.js";
import DB from "../model/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import nodemailer from "nodemailer";
const getSignupOtp = asyncHandler(async (req, res, next) => {
  const { universityEmail } = req.body;

  if (!universityEmail || !universityEmail.includes("@mujonline.edu.in")) {
    return next(new CustomError("This is not a valid University Email", 404));
  }
  const [[isAlreadyRegistered]] = await DB.execute(
    "SELECT * FROM users WHERE universityEmail = ?",
    [universityEmail]
  );

  if (isAlreadyRegistered) {
    return next(
      new CustomError("User with this email already registered", 404)
    );
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const [result] = await DB.execute(
    `INSERT INTO verification (universityEmail, otp, otpExpiryAt)
     VALUES (?, ?, NOW() + INTERVAL 5 MINUTE)`,
    [universityEmail, otp]
  );
  if (result.affectedRows != 1) {
    return next(new CustomError("Could not create OTP please try again", 500));
  }
  //OTP functionality
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
    to: universityEmail,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };
  const mailResponse = await transporter.sendMail(message);

  res.status(201).json({
    success: true,
    message: "OTP sent Successfully",
  });
});

const singupController = asyncHandler(async (req, res, next) => {
  const { name, universityEmail, course, password, batch, phone, otp, phone2 } =
    req.body;
  if (
    !name ||
    !universityEmail ||
    !course ||
    !password ||
    !batch ||
    !phone ||
    !otp
  ) {
    return next(new CustomError("All fields are required", 400));
  }
  const [[isValidOtp]] = await DB.execute(
    `SELECT * FROM verification WHERE universityEmail = ? AND otp = ? AND otpExpiryAt >NOW()`,
    [universityEmail, otp]
  );
  if (!isValidOtp) {
    return next(new CustomError("Invalid OTP", 404));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const finalRegistration = await DB.execute(
    `INSERT INTO users(name, universityEmail, course, batch , phone, password, phone2) values(?,?,?,?,?,?,?)`,
    [
      name,
      universityEmail,
      course,
      batch,
      phone,
      hashedPassword,
      phone2 || null,
    ]
  );
  await DB.execute(`DELETE FROM verification WHERE universityEmail = ?`, [
    universityEmail,
  ]);
  res.status(201).json({
    success: true,
    messsage: "Signup successful. Sign in to continue",
  });
});
const signInController = asyncHandler(async (req, res, next) => {
  const { universityEmail, password } = req.body;

  if (!universityEmail || !password) {
    return next(new CustomError("Email and Password are required", 404));
  }
  const [[userDetails]] = await DB.execute(
    "SELECT * FROM users WHERE universityEmail=?",
    [universityEmail]
  );

  if (!userDetails) {
    return next(
      new CustomError(
        "This user does not exist in our database, Please Signup",
        404
      )
    );
  }
  const isCorrectPassword = await bcrypt.compare(
    password,
    userDetails.password
  );
  if (!isCorrectPassword) {
    return next(new CustomError("Invalid Password", 404));
  }
  const jwtToken = jwt.sign(
    { id: userDetails.id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY_DAYS,
    }
  );
  res.status(200).json({
    success: true,
    message: {
      token: jwtToken,
      id: userDetails.id,
      name: userDetails.name,
      universityEmail: userDetails.universityEmail,
      phone: userDetails.phone,
      role: userDetails.role,
      course: userDetails.course,
      batch: userDetails.batch,
      image: userDetails.image,
      email: userDetails.email,
      phone2: userDetails.phone2,
    },
  });
});
const resetPassword = asyncHandler(async (req, res, next) => {
  const { universityEmail } = req.body;
  if (!universityEmail) {
    return next(new CustomError("Univeristy Email is required", 404));
  }
  const userDetails = await DB.execute(
    "SELECT * FROM users WHERE universityEmail = ?",
    [universityEmail]
  );
  if (!userDetails) {
    return next(new CustomError("User with this Email does not exist", 404));
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
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
    to: universityEmail,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };
  await DB.execute(
    `INSERT INTO verification (universityEmail, otp, otpExpiryAt)
     VALUES (?, ?, NOW() + INTERVAL 5 MINUTE)`,
    [universityEmail, otp]
  );
  const mailResponse = await transporter.sendMail(message);
  res.status(201).json({
    success: true,
    message: "OTP send successfully",
  });
});

const verifyResetPassword = asyncHandler(async (req, res, next) => {
  const { universityEmail, otp, newPassword } = req.body;

  if (!universityEmail || !otp || !newPassword) {
    return next(new CustomError("email, otp and password is required", 400));
  }

  const [[isValidOtp]] = await DB.execute(
    `SELECT * FROM verification WHERE universityEmail = ? AND otp = ? AND otpExpiryAt > NOW()`,
    [universityEmail, otp]
  );

  if (!isValidOtp) {
    return next(new CustomError("Invalid OTP or OTP expired", 404));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatePassword = await DB.execute(
    `UPDATE users SET password = ? WHERE universityEmail = ?`,
    [hashedPassword, universityEmail]
  );

  await DB.execute(`DELETE FROM verification WHERE universityEmail = ?`, [
    universityEmail,
  ]);

  res.status(200).json({
    success: true,
    message:
      "Password reset successful. You can now sign in with your new password.",
  });
});

export {
  singupController,
  signInController,
  getSignupOtp,
  resetPassword,
  verifyResetPassword,
};
