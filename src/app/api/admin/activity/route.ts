import { NextResponse } from "next/server";

export async function GET() {
  const activities = [
    {
      id: Math.random().toString(36).substring(7),
      type: "Pro User (EU-Central)",
      desc: "Ran deep plagiarism scan (4,250 words) • 0% similarity",
      time: "Just now",
      status: "Passed",
      badge: "PRO",
      badgeColor: "bg-blue-600",
    },
    {
      id: Math.random().toString(36).substring(7),
      type: "Agency Tier (US-East)",
      desc: "Batch grammar & AI detector query (38 documents completed)",
      time: "2 mins ago",
      status: "200 OK",
      badge: "API",
      badgeColor: "bg-gray-700",
    },
    {
      id: Math.random().toString(36).substring(7),
      type: "Anonymous User (SG-West)",
      desc: "Article Rewriter check (680 words) completed",
      time: "5 mins ago",
      status: "Success",
      badge: "FREE",
      badgeColor: "bg-gray-400",
    },
    {
      id: Math.random().toString(36).substring(7),
      type: "Enterprise Account (UK)",
      desc: "Generated new v3 webhook & production API secret",
      time: "12 mins ago",
      status: "Security",
      badge: "PRO",
      badgeColor: "bg-blue-600",
    },
  ];

  // Randomly shuffle or pick some to simulate new feed items
  const count = Math.floor(Math.random() * 2) + 3;
  const shuffled = activities.sort(() => 0.5 - Math.random()).slice(0, count);
  // Always keep "Just now" at top
  shuffled.sort((a, b) => a.time === "Just now" ? -1 : 1);

  return NextResponse.json({ activities: shuffled });
}
