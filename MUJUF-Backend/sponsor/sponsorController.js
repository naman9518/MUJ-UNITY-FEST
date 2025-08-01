import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/customError.js";
import DB from "../model/db.js";
import sendMail from "../utils/sendMail.js";

const sponsorController = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    companyName,
    companyEmail,
    phoneNumber,
    designation,
    message,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !companyName ||
    !companyEmail ||
    !phoneNumber ||
    !designation
  ) {
    return next(new CustomError("All fields except message are required", 400));
  }

  try {
    // Save sponsor to database
    const [result] = await DB.execute(
      `INSERT INTO sponsors (firstName, lastName, companyName, companyEmail, phoneNumber, designation, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        companyName,
        companyEmail,
        phoneNumber,
        designation,
        message || null,
      ]
    );

    if (result.affectedRows !== 1) {
      return next(new CustomError("Failed to save sponsor details", 500));
    }

    // Prepare email content
    const ownerEmail = process.env.NODEMAILER_EMAIL_USER;
    const subject = `New Sponsorship Request from ${companyName}`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Sponsor Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${companyEmail}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Designation:</strong> ${designation}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
      </div>
    `;

    // Send email to owner with replyTo set as companyEmail
    const mailResponse = await sendMail(ownerEmail, subject, html, companyEmail);

    if (!mailResponse.accepted || mailResponse.accepted.length === 0) {
      return next(
        new CustomError("Sponsor saved, but email could not be sent", 500)
      );
    }

    res.status(201).json({
      success: true,
      message: "Sponsor details saved and email sent to owner successfully",
      sponsorId: result.insertId,
    });
  } catch (error) {
    next(new CustomError("Error: " + error.message, 500));
  }
});

export default sponsorController;
