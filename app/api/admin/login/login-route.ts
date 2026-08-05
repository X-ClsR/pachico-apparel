import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
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