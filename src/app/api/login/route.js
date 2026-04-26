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

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    try {
      const client = await clientPromise;
      const db = client.db('accredian');
      
      const user = await db.collection('users').findOne({ email, password });

      if (user) {
        return NextResponse.json({ 
          message: 'Login successful', 
          user: { name: user.name, email: user.email } 
        }, { status: 200 });
      }
    } catch (dbError) {
      console.warn('MongoDB failed during login, using fallback storage');
      const users = getLocalUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        return NextResponse.json({ 
          message: 'Login successful', 
          user: { name: user.name, email: user.email } 
        }, { status: 200 });
      }
    }

    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
