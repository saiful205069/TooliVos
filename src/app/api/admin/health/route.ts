import { NextResponse } from "next/server";
import { getDb, saveDb, SupportTicket, SystemNotification, UserLogin } from "@/lib/adminDb";

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  const baseLoad = db.stats.todaysChecks; // 0 initially
  
  const generateLoad = (percentage: number) => {
    if (baseLoad === 0) return 0;
    return Math.floor(baseLoad * percentage) + Math.floor(Math.random() * 5);
  };
  const generateSpeed = (base: number) => {
    if (baseLoad === 0) return "0.0";
    return (base + (Math.random() * 0.2 - 0.1)).toFixed(1);
  };

  const engines = [
    {
      id: "plagiarism",
      name: "Plagiarism Checker",
      desc: "Multi-engine semantic parser",
      state: "Healthy",
      load: generateLoad(0.42),
      speed: generateSpeed(1.2),
      icon: "spellcheck",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "ai-detector",
      name: "AI Content Detector",
      desc: "Perplexity & Burstiness v4",
      state: "Healthy",
      load: generateLoad(0.28),
      speed: generateSpeed(0.8),
      icon: "smart_toy",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      id: "ai-humanizer",
      name: "AI Humanizer",
      desc: "Natural rewrite pipeline",
      state: baseLoad > 1000 ? "High Traffic" : "Healthy",
      load: generateLoad(0.18),
      speed: generateSpeed(1.6),
      icon: "record_voice_over",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "seo-tools",
      name: "Backlink & SEO Tools",
      desc: "Domain rank & anchor checker",
      state: "Healthy",
      load: generateLoad(0.07),
      speed: generateSpeed(0.9),
      icon: "link",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "pdf-tools",
      name: "PDF & File Converters",
      desc: "OCR & compression tasks",
      state: "Healthy",
      load: generateLoad(0.05),
      speed: generateSpeed(0.5),
      icon: "picture_as_pdf",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return NextResponse.json({ engines });
}
