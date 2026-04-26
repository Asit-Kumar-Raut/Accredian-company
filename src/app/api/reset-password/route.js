import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/users.json');

export async function POST(req) {
  try {
    const { email, otp, newPassword } = await req.json();

    // 1. Verify OTP and update password
    let success = false;
    try {
      const client = await clientPromise;
      const db = client.db('accredian');
      const result = await db.collection('users').updateOne(
        { email, resetOtp: otp },
        { $set: { password: newPassword }, $unset: { resetOtp: "" } }
      );
      if (result.modifiedCount > 0) success = true;
    } catch (dbError) {
      // Fallback to local JSON
      if (fs.existsSync(DATA_PATH)) {
        const users = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
        const index = users.findIndex(u => u.email === email && u.resetOtp === otp);
        if (index !== -1) {
          users[index].password = newPassword;
          delete users[index].resetOtp;
          fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
          success = true;
        }
      }
    }

    if (success) {
      return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid OTP or email' }, { status: 400 });
    }
  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json({ message: 'Error resetting password' }, { status: 500 });
  }
}
