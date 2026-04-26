import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/users.json');

const getLocalUsers = () => {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(data || '[]');
};

const saveLocalUser = (user) => {
  if (process.env.NODE_ENV === 'production') return; // Vercel is read-only
  const users = getLocalUsers();
  const index = users.findIndex(u => u.email === user.email);
  if (index > -1) {
    users[index] = { ...users[index], ...user };
  } else {
    users.push(user);
  }
  
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    let dbSuccess = false;
    try {
      const client = await clientPromise;
      const db = client.db('accredian');
      
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser && existingUser.status === 'verified') {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
      }

      await db.collection('users').updateOne(
        { email },
        { $set: { name, password, otp, status: 'pending', createdAt: new Date() } },
        { upsert: true }
      );
      dbSuccess = true;
      console.log('User saved to MongoDB');
    } catch (dbError) {
      console.warn('MongoDB failed:', dbError.message);
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ message: 'Database connection failed. Please check MongoDB settings.' }, { status: 500 });
      }
      
      const users = getLocalUsers();
      const existingUser = users.find(u => u.email === email);
      if (existingUser && existingUser.status === 'verified') {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
      }
      saveLocalUser({ name, email, password, otp, status: 'pending', createdAt: new Date() });
    }

    // Send Email
    try {
      await transporter.sendMail({
        from: `"Accredian Verification" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #2563eb;">Verify Your Account</h2>
            <p>Thank you for registering with Accredian. Use the code below to verify your email:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2563eb; padding: 20px; background: #f3f4f6; border-radius: 10px; text-align: center; margin: 20px 0;">
              ${otp}
            </div>
            <p>This code will expire in 10 minutes.</p>
          </div>
        `,
      });
      console.log('OTP sent to:', email);
    } catch (mailError) {
      console.error('Mail Error:', mailError);
      // Even if mail fails, we return success so user can see the OTP in logs (for development)
      return NextResponse.json({ 
        message: 'Registration initiated, but email failed. (Dev Tip: Check server console for OTP)',
        otp: process.env.NODE_ENV === 'development' ? otp : undefined 
      }, { status: 200 });
    }

    return NextResponse.json({ message: 'OTP sent to your email' }, { status: 200 });
  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
