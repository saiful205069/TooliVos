"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-card shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1240px] mx-auto px-margin-desktop pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-gutter-desktop mb-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <img
                alt="Brand logo. - Primary color: #0f70ba
- Font: nunitoSans
- Mode: light
- Roundness: rounded-sm
"
                className="h-7 w-auto object-contain"
                src="/logo.svg"
              />
              <span className="text-[24px] font-black tracking-tight ml-2 font-sans flex items-center">
                <span className="text-[#0F172A]">Tooli</span>
                <span className="text-primary">Vos</span>
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Leading online provider of free and premium digital utilities, SEO
              auditors, plagiarism detectors, and productivity tools trusted by
              over 10 million webmasters worldwide.
            </p>
            <div className="flex items-center gap-space-sm mt-space-xs">
              <span className="px-space-sm py-space-xs rounded bg-pill-tag-bg text-primary font-label-sm text-label-sm">
                256-Bit SSL Encrypted
              </span>
              <span className="px-space-sm py-space-xs rounded bg-pill-tag-bg text-primary font-label-sm text-label-sm">
                ISO 27001 Certified
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Text Analysis
            </span>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="text-analysis"
                  href="/text-analysis/plagiarism-checker"
                >
                  Plagiarism Checker
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="text-analysis"
                  href="/text-analysis/article-rewriter"
                >
                  Article Rewriter
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="text-analysis"
                  href="/text-analysis/free-grammar-checker"
                >
                  Grammar Checker
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="text-analysis"
                  href="/text-analysis/word-counter"
                >
                  Word Counter
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="text-analysis"
                  href="/text-analysis/ai-detector"
                >
                  AI Content Detector
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              SEO &amp; Domains
            </span>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="seo-backlinks"
                  href="/seo-backlinks/backlink-checker"
                >
                  Backlink Checker
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="seo-backlinks"
                  href="/seo-backlinks/keyword-position-tracker"
                >
                  Keyword Rank Tracker
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="seo-backlinks"
                  href="/seo-backlinks/domain-authority-checker"
                >
                  Domain Authority
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="seo-backlinks"
                  href="/seo-backlinks/xml-sitemap-generator"
                >
                  XML Sitemap Gen
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="seo-backlinks"
                  href="/seo-backlinks/meta-tag-generator"
                >
                  Meta Tag Generator
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Images &amp; PDF
            </span>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="images-pdf"
                  href="/images-pdf/reverse-image-search"
                >
                  Reverse Image Search
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="images-pdf"
                  href="/image-tools/image-compressor"
                >
                  Image Compressor
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="images-pdf"
                  href="/images-pdf/pdf-to-word"
                >
                  PDF to Word
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="images-pdf"
                  href="/images-pdf/word-to-pdf"
                >
                  Word to PDF
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="images-pdf"
                  href="/image-tools/favicon-generator"
                >
                  Favicon Generator
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Platform
            </span>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="all-tools"
                  href="/pro"
                >
                  Explore Pro Plans
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="all-tools"
                  href="/api"
                >
                  Developer API
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="all-tools"
                  href="/"
                >
                  Chrome Extension
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="all-tools"
                  href="/"
                >
                  WordPress Plugin
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  data-path="all-tools"
                  href="/support"
                >
                  Support Center
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-surface-subtle p-space-lg rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col gap-space-xs">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Subscribe to SEO &amp; Webmaster Insights
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Get the latest algorithm changes, SEO cheat sheets, and tool
              release updates.
            </span>
          </div>
          <form className="flex items-center gap-space-xs w-full md:w-auto" onSubmit={(e) => {
              e.preventDefault();
              const input = document.getElementById("sub-email") as HTMLInputElement;
              if (!input || !input.value) return;
              fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: input.value })
              }).then(() => {
                alert("Subscribed successfully!");
                input.value = "";
              });
            }}>
            <input type="email" id="sub-email" placeholder="Enter your email address" required className="bg-surface-card px-space-md py-space-sm rounded-xl text-on-surface-variant font-body-sm text-body-sm w-full md:w-64 shadow-sm outline-none focus:ring-2 focus:ring-primary/20" />
            <button
              className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-lg py-space-sm rounded-xl transition-colors whitespace-nowrap"
              type="submit">Subscribe</button></form>
        </div>
        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
          <p>&copy; 2024 TooliVos.com. All rights reserved. | Developed By Saiful Islam</p>
          <div className="flex items-center gap-space-md">
            <a className="hover:text-primary transition-colors" href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="/refund-policy" target="_blank" rel="noopener noreferrer">Refund Policy</a>
            <a className="hover:text-primary transition-colors" href="/security-policy" target="_blank" rel="noopener noreferrer">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
