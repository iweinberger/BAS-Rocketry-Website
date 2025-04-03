import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

console.log(process.env.MAILGUN_SMTP_PASSWORD);
console.log(process.env.NODE_PUBLIC_MAILGUN_SMTP_PASSWORD);
const pass = process.env.NODE_PUBLIC_MAILGUN_SMTP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false, // TLS is handled by the port
  auth: {
    user: 'postmaster@basrocketry.com',
    pass: pass || ''
  }
});

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: 'BAS Rocketry <contact@basrocketry.com>',
      to: 'rocketry@bastoronto.org',
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      replyTo: email
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Check if the email was actually sent
    if (info.messageId) {
      return NextResponse.json({ 
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId
      });
    } else {
      throw new Error('Email was not sent successfully');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}