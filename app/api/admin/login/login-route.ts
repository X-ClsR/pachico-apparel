import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  const inputPassword = (password ?? "").trim();
  const correctPassword = (process.env.ADMIN_PASSWORD ?? "").trim();

  // Debug sementara — cek di Vercel > Logs kalau masih gagal.
  // Ini cuma nunjukin PANJANG karakter, bukan isi passwordnya, jadi aman.
  console.log(
    "Login attempt — panjang input:",
    inputPassword.length,
    "| panjang ADMIN_PASSWORD di env:",
    correctPassword.length,
    "| ADMIN_PASSWORD ke-detect?:",
    Boolean(process.env.ADMIN_PASSWORD)
  );

  if (!correctPassword) {
    return NextResponse.json(
      { message: "ADMIN_PASSWORD belum ke-set di server" },
      { status: 500 }
    );
  }

  if (inputPassword !== correctPassword) {
    return NextResponse.json(
      { message: "Password salah" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("admin_session", "logged_in", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}