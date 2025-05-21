import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/customError.js";
import DB from "../model/db.js";

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

    res.status(201).json({
      success: true,
      message: "Sponsor details saved successfully",
      sponsorId: result.insertId,
    });
  } catch (error) {
    next(new CustomError("Database error: " + error.message, 500));
  }
});

export default sponsorController;
