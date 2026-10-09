import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // or specific domain
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // CORS preflight
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const {
      fname,
      phone,
      state,
      pincode,
      pan
    } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // store in environment variable
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "support@samatvaawareness.in",
      to: "support@samatvaawareness.in",
      subject: "New Form Submission",
      html: `
        <h2>New Contact Form Submission from Samatva</h2>
        <p><strong>Name:</strong> ${fname}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Pincode:</strong> ${pincode}</p>https://form-be.vercel.app/send-mail
        <p><strong>PanCard No:</strong> ${pan}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ success: false, message: "Email sending failed" });
  }
}
