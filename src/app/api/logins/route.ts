import { NextResponse } from "next/server";
import { getDb, saveDb, SupportTicket, SystemNotification, UserLogin } from "@/lib/adminDb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDb();

    const newLogin: UserLogin = {
      id: Math.random().toString(36).substring(7),
      email: body.email,
      method: body.method || "Email",
      timestamp: new Date().toISOString(),
    };

    const newNotification: SystemNotification = {
      id: Math.random().toString(36).substring(7),
      type: "login",
      title: "User Logged In",
      message: `${body.email} logged in via ${body.method || "Email"}`,
      timestamp: new Date().toISOString(),
      read: false,
    };

    db.userLogins.unshift(newLogin);
    db.notifications.unshift(newNotification);
    
    // Simulate traffic
    db.stats.activeUsers += 1;
    saveDb(db);

    return NextResponse.json({ success: true, login: newLogin });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to log login" }, { status: 500 });
  }
}
