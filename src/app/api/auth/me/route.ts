import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_seo_key_123";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("seo_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Fetch latest user info from DB
    const user = db
      .prepare(
        "SELECT id, name, email, isPro, createdAt FROM users WHERE id = ?",
      )
      .get(decoded.id) as any;

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isPro: Boolean(user.isPro),
        joinDate: new Date(user.createdAt).toLocaleDateString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
