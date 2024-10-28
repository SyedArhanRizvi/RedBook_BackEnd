import nodemailer from "nodemailer";

const sendOtpEmail = async (userEmail, userOtp) => {
  // Set up transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'redBook0110@gmail.com', // Replace with your email
      pass: 'your-email-password',  // Replace with your email password or app-specific password
    },
  });

  // Email options
  const mailOptions = {
    from: 'redBook0110@gmail.com',         // Sender's email address
    to: userEmail,          // Recipient's email address
    subject: 'Your OTP Code',
    text: `Hello, your OTP code is: ${userOtp}`, // Plain text message
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};
export default sendOtpEmail;
// Usage
// const userOtp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP
// sendOtpEmail('arhanrizvi9@gmail.com', userOtp);
