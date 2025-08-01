import db from "../model/db.js";
import sendMail from "../utils/sendMail.js";

export const submitContactQuery = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    enquiryType,
    subject,
    message,
  } = req.body;

  // Basic validations
  if (!firstName || !email || !enquiryType || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "All required fields must be filled",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email format" });
  }

  if (phone && !phoneRegex.test(phone)) {
    return res.status(400).json({ success: false, error: "Invalid phone number format" });
  }

  try {
    // Save to database
    const [result] = await db.execute(
      `INSERT INTO contact_queries 
       (firstName, lastName, email, phone, enquiryType, subject, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName || '', email, phone || '', enquiryType, subject, message]
    );

    // Prepare email
    const ownerEmail = process.env.NODEMAILER_EMAIL_USER;
    const mailSubject = `New Contact Query: ${subject}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Enquiry Type:</strong> ${enquiryType}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `;

    const mailResponse = await sendMail(ownerEmail, mailSubject, htmlContent, email); // replyTo = sender's email

    if (!mailResponse.accepted || mailResponse.accepted.length === 0) {
      return res.status(500).json({
        success: false,
        error: "Query saved, but email could not be sent to admin",
      });
    }

    res.status(200).json({
      success: true,
      message: "Query submitted and email sent successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error while saving contact query",
    });
  }
};
