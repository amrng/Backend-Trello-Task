import nodemailer from "nodemailer";
import "dotenv/config";

// Send Varification Email
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.PASSWORD_EMAIL_APP_WINDOW,
  },
});

// Send the email
async function sendMail(mailOptions) {
  await transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent:", info.response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
}
export default sendMail;
