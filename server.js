import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "support@samatvaawareness.in",
    pass: "xtsx wtmx tvpw ntsh"
    // user: "greesevijaygilbert18@gmail.com",
    // pass: "wimf qalv ktjt cmic", // Use Gmail App Password
  },
});

// API Route
app.post("/send-mail", async (req, res) => {
  try {
    const { firstName, lastName, phone, email, dob, employmentType, address, pincode, } = req.body;
    const mailOptions = {
      from: "support@samatvaawareness.in",
      to: "support@samatvaawareness.in", // receive email
      subject: "New Form Submission",
      html: `
        <h2>New Contact Form Submission From Samatva</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>Employment Type:</strong> ${employmentType}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Pincode:</strong> ${pincode}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Serve index.html
app.use(express.static("public"));

app.listen(5050, () => console.log("Server running on port 5050"));
