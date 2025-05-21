import db from '../model/db.js';

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
    return res.status(400).json({ success: false, error: "All required fields must be filled" });
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
    const [result] = await db.execute(
      `INSERT INTO contact_queries 
       (firstName, lastName, email, phone, enquiryType, subject, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName || '', email, phone || '', enquiryType, subject, message]
    );

    res.status(200).json({ success: true, message: "Query submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error while saving contact query" });
  }
};
