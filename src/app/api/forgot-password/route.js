import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '@/lib/db';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/users.json');

export async function POST(req) {
  try {
    const { email } = await req.json();

    // 1. Check if user exists
    let user = null;
    try {
      const client = await clientPromise;
      const db = client.db('accredian');
      user = await db.collection('users').findOne({ email });
    } catch (dbError) {
      // Fallback to local JSON
      if (fs.existsSync(DATA_PATH)) {
        const users = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
        user = users.find(u => u.email === email);
      }
    }

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 2. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In a real app, you'd store this OTP in DB with an expiry.
    // For this assignment, we'll store it in a global/local cache or just send it.
    // We'll update the user object with the reset OTP.
    
    try {
      const client = await clientPromise;
      const db = client.db('accredian');
      await db.collection('users').updateOne({ email }, { $set: { resetOtp: otp } });
    } catch (dbError) {
      if (fs.existsSync(DATA_PATH)) {
        const users = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
        const index = users.findIndex(u => u.email === email);
        if (index !== -1) {
          users[index].resetOtp = otp;
          fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
        }
      }
    }

    // 3. Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP - Accredian',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563eb;">Password Reset</h2>
          <p>You requested a password reset. Use the OTP below to set a new password:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1e293b; border-radius: 8px;">
            ${otp}
          </div>
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">This OTP will expire shortly. If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return NextResponse.json({ message: 'Error sending OTP' }, { status: 500 });
  }
}
