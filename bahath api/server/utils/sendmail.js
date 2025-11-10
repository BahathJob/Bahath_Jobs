import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
 
// Create transporter for Microsoft 365 SMTP
async function sendEmail({ to, subject, text, html }) {
  try {
    // Create transporter dynamically from env variables
    const transporter = nodemailer.createTransport({
         host: "smtp.office365.com",
      port: 588,
      secure: false, // STARTTLS
      auth: {
        user: "inquiries@bahathjobz.com",
        pass: "Thair@Qatar151020251557", // use an App Password if MFA is on
      },
      tls: {
        ciphers: "TLSv1.2",
        rejectUnauthorized: false,
      },
    });

    // Mail details
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME || 'Bahath Jobz'}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    };

    // Send the mail
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.response);
    return { success: true, response: info.response };
  } catch (error) {
    console.error('❌ Error while sending email:', error);
    return { success: false, error };
  }
}

export default sendEmail;