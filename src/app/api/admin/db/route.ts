import { NextResponse } from "next/server";
import { getDb, saveDb, SupportTicket, SystemNotification, UserLogin } from "@/lib/adminDb";

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db);
}
