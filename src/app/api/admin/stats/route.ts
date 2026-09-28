import { NextResponse } from "next/server";

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Add random fluctuations to make it feel real-time
  const randomUsers = Math.floor(Math.random() * 500) - 250;
  const randomChecks = Math.floor(Math.random() * 1000) - 100;
  
  return NextResponse.json({
    activeUsers: 124580 + randomUsers,
    activeUsersChange: "+5.2%",
    todaysChecks: 342190 + randomChecks,
    todaysChecksPeak: "11:30 AM",
    topTool: "Plagiarism Tool",
    topToolTraffic: 42,
    serverHealth: 99.9,
    globalLatency: Math.floor(Math.random() * 20) + 70 + "ms avg",
  });
}
