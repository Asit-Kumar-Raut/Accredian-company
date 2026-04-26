import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/users.json');

const getLocalUsers = () => {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(data || '[]');
};

const updateLocalUserStatus = (email, status) => {
  const users = getLocalUsers();
  const index = users.findIndex(u => u.email === email);
  if (index > -1) {
    users[index].status = status;
    delete users[index].otp;
    
    // Ensure directory exists
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
  }
};

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    try {
      const client = await clientPromise;
      const db = client.db('accredian');
      
      const user = await db.collection('users').findOne({ email, otp });

      if (user) {
        await db.collection('users').updateOne(
          { email },
          { $set: { status: 'verified' }, $unset: { otp: "" } }
        );
        return NextResponse.json({ message: 'Account verified successfully' }, { status: 200 });
      }
    } catch (dbError) {
      console.warn('MongoDB failed during verification, using fallback storage');
      const users = getLocalUsers();
      const user = users.find(u => u.email === email && u.otp === otp);
      if (user) {
        updateLocalUserStatus(email, 'verified');
        return NextResponse.json({ message: 'Account verified successfully' }, { status: 200 });
      }
    }

    return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
