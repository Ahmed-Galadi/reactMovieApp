import nodemailer from 'nodemailer';

// Service Layer: Contains business logic for email operations

// Create a transporter (a connection to email server)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send an actual email for password reset
export async function sendResetEmail(to: string, resetToken: string) {
  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: to,
    subject: 'Reset Your Password - Tawqil AI',
    html: `
      <h1>Password Reset</h1>   
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
}
