import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '@/lib/db';

export async function POST(req) {
  try {
    const { name, email, phone, company, domain, candidates, mode, location } = await req.json();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration in .env.local');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    // 1. Save to MongoDB
    try {
      const client = await clientPromise;
      const db = client.db('accredian');
      await db.collection('leads').insertOne({
        name,
        email,
        phone,
        company,
        domain,
        candidates,
        mode,
        location,
        createdAt: new Date(),
      });
      console.log('Lead saved to MongoDB successfully');
    } catch (dbError) {
      console.error('MongoDB Error:', dbError.message);
    }

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ardiliumplatform@gmail.com',
      subject: `🔥 New Lead from Accredian: ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: -0.5px;">New Enquiry Received</h1>
            <p style="color: rgba(255,255,255,0.8); margin-top: 10px; font-size: 14px;">Accredian Enterprise Portal</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <div style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #f1f5f9;">
              <p style="color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">Customer Details</p>
              <p style="margin: 0; color: #1e293b; font-size: 18px; font-weight: 600;">${name}</p>
              <p style="margin: 5px 0 0; color: #3b82f6; font-size: 14px;">${email}</p>
              <p style="margin: 5px 0 0; color: #475569; font-size: 14px;">📞 ${phone}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Company</td>
                <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${company}</td>
              </tr>
              <tr style="border-top: 1px solid #f8fafc;">
                <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Domain</td>
                <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${domain}</td>
              </tr>
              <tr style="border-top: 1px solid #f8fafc;">
                <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Candidates</td>
                <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${candidates}</td>
              </tr>
              <tr style="border-top: 1px solid #f8fafc;">
                <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Mode</td>
                <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${mode}</td>
              </tr>
              <tr style="border-top: 1px solid #f8fafc;">
                <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Location</td>
                <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${location}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}" style="background: #2563eb; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Reply to Lead</a>
            </div>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 Accredian. All leads are recorded in your dashboard.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ message: 'Error', error: error.message }, { status: 500 });
  }
}
