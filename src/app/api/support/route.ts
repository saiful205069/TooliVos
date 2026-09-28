import { NextResponse } from "next/server";
import { getDb, saveDb, SupportTicket, SystemNotification, UserLogin } from "@/lib/adminDb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDb();

    const newTicket: SupportTicket = {
      id: Math.random().toString(36).substring(7),
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
      status: "unread",
    };

    const newNotification: SystemNotification = {
      id: Math.random().toString(36).substring(7),
      type: "support",
      title: "New Support Ticket",
      message: `${body.name} (${body.email}) sent a message: ${body.subject}`,
      timestamp: new Date().toISOString(),
      read: false,
    };

    db.supportTickets.unshift(newTicket);
    db.notifications.unshift(newNotification);
    
    // Also simulate a bit of traffic
    db.stats.activeUsers += 1;
    saveDb(db);

    return NextResponse.json({ success: true, ticket: newTicket });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to submit" }, { status: 500 });
  }
}
