"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const websiteManagementTools = [
  {
    name: "Website SEO Score Checker",
    slug: "seo-score-checker",
    icon: "calculate",
  },
  {
    name: "Online Ping Website Tool",
    slug: "online-ping-website-tool",
    icon: "sensors",
  },
  { name: "Page Speed Test", slug: "page-speed-test", icon: "speed" },
  { name: "Website Page Snooper", slug: "website-page-snooper", icon: "code" },
  {
    name: "XML Sitemap Generator",
    slug: "xml-sitemap-generator",
    icon: "account_tree",
  },
  { name: "Open Graph Checker", slug: "open-graph-checker", icon: "analytics" },
  {
    name: "Open Graph Generator",
    slug: "open-graph-generator",
    icon: "pie_chart",
  },
  {
    name: "Twitter Card Generator",
    slug: "twitter-card-generator",
    icon: "campaign",
  },
  {
    name: "Mobile Friendly Test",
    slug: "mobile-friendly-test",
    icon: "smartphone",
  },
  {
    name: "Video Downloader",
    slug: "video-downloader",
    icon: "download_for_offline",
  },
  {
    name: "Facebook Video Downloader",
    slug: "facebook-video-downloader",
    icon: "download_for_offline",
  },
  {
    name: "Instagram Video Downloader",
    slug: "instagram-video-downloader",
    icon: "download_for_offline",
  },
  {
    name: "Robots.txt Generator",
    slug: "robots.txt-generator",
    icon: "description",
  },
  { name: "URL Shortener", slug: "url-shortener", icon: "link" },
  { name: "HTML Viewer", slug: "html-viewer", icon: "html" },
  {
    name: "TikTok Video Downloader",
    slug: "tiktok-video-downloader",
    icon: "download_for_offline",
  },
  { name: "PTCL Speed Test", slug: "ptcl-speed-test", icon: "network_check" },
];

const websiteTrackingTools = [
  { name: "Check Server Status", slug: "check-server-status", icon: "dns" },
  {
    name: "Google Cache Checker",
    slug: "google-cache-checker",
    icon: "storage",
  },
  {
    name: "Page Authority Checker",
    slug: "page-authority-checker",
    icon: "insert_drive_file",
  },
  {
    name: "Google Index Checker",
    slug: "google-index-checker",
    icon: "list_alt",
  },
  {
    name: "Alexa Rank Checker",
    slug: "alexa-rank-checker",
    icon: "trending_up",
  },
  { name: "Redirect Checker", slug: "redirect-checker", icon: "sync" },
  { name: "Find Facebook ID", slug: "find-facebook-id", icon: "person_search" },
  { name: "GEO IP Locator", slug: "geo-ip-locator", icon: "location_on" },
  { name: "What Is My Browser", slug: "what-is-my-browser", icon: "language" },
  { name: "Is It Down", slug: "is-it-down", icon: "error_outline" },
];

const domainTools = [
  { name: "Domain Age Checker", slug: "domain-age-checker", icon: "history" },
  {
    name: "Domain Authority Checker",
    slug: "domain-authority-checker",
    icon: "domain_verification",
  },
  {
    name: "Domain Hosting Checker",
    slug: "domain-hosting-checker",
    icon: "dns",
  },
  {
    name: "Bulk Domain Rating Checker",
    slug: "bulk-domain-rating-checker",
    icon: "fact_check",
  },
  {
    name: "Index Pages Checker",
    slug: "index-pages-checker",
    icon: "plagiarism",
  },
  { name: "Spam Score Checker", slug: "spam-score-checker", icon: "warning" },
];

export default function SeoDirectory() {
  const renderSection = (title: string, description: string, tools: any[]) => (
    <div className="mb-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-[28px] font-bold text-[#1A202C] mb-4">{title}</h2>
        <p className="text-[16px] text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6">
        {tools.map((tool, idx) => (
            <a
                  href={`/seo-backlinks/${tool.slug}`}
                  key={idx}
                  className="group flex flex-col items-center gap-3 w-full text-center p-2 transition-all cursor-pointer"
                >
                  <div className="w-[80px] h-[80px] rounded-2xl bg-white flex items-center justify-center border-2 border-[#E2E8F0] shadow-sm group-hover:border-[#1961A5] group-hover:shadow-md transition-all duration-300">
                    <span translate="no" className="material-symbols-outlined text-[36px] text-[#1961A5] notranslate font-light group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </span>
                  </div>
                  <span className="font-medium text-[13px] sm:text-[14px] text-gray-800 px-1 leading-snug">
                    {tool.name}
                  </span>
                </a>
          ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 md:p-14">
          {renderSection(
            "Website Management Tools",
            "If you are struggling to get more traffic and enhance your website performance, then use these website management tools and in-depth web analysis.",
            websiteManagementTools,
          )}

          <hr className="border-gray-100 mb-16" />

          {renderSection(
            "Website Tracking Tools",
            "A list of free tools in one place to measure, monitor, and keep track of your website's performance.",
            websiteTrackingTools,
          )}

          <hr className="border-gray-100 mb-16" />

          {renderSection(
            "Domains Tools",
            "A range of domain related tools to find out domain age, domain authority, DNS records or expired domains, etc.",
            domainTools,
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
