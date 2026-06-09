import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { nama, email, pesan } = await req.json();

  if (!nama || !email || !pesan) {
    return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"CreditGuard Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `CreditGuard Inquiry dari ${nama}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="border-bottom:1px solid #eee;padding-bottom:12px">Pesan Baru dari CreditGuard</h2>
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p style="background:#f5f5f5;padding:12px;border-radius:6px;white-space:pre-wrap">${pesan}</p>
        <hr style="margin-top:24px"/>
        <p style="color:#999;font-size:12px">CreditGuard</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
