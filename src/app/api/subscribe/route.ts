import { NextResponse } from "next/server";
import { getDb, saveDb, SystemNotification } from "@/lib/adminDb";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const db = getDb();
    
    // Create notification
    const newNotification: SystemNotification = {
      id: Math.random().toString(36).substring(7),
      type: "system", // We'll use system for subscriptions, or add a new type
      title: "New Newsletter Subscriber",
      message: `${email} has subscribed to the SEO & Webmaster Insights newsletter.`,
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Add to DB
    if (!db.subscriptions) {
      db.subscriptions = [];
    }
    db.subscriptions.unshift({
      id: Math.random().toString(36).substring(7),
      email,
      timestamp: new Date().toISOString(),
    });
    
    db.notifications.unshift(newNotification);
    
    // Save DB
    saveDb(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
