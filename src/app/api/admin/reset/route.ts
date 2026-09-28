import { NextResponse } from "next/server";
import { getDb, saveDb, SupportTicket, SystemNotification, UserLogin } from "@/lib/adminDb";

export async function POST() {
  const db = getDb();
  db.stats.activeUsers = 0;
  db.stats.todaysChecks = 0;
  db.supportTickets = [];
  db.userLogins = [];
  db.notifications = [];
  saveDb(db);
  return NextResponse.json({ success: true });
}
