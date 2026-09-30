"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {

  const allTools = [
    { title: 'Plagiarism Checker', href: '/text-analysis/plagiarism-checker', icon: 'find_in_page' },
    { title: 'AI Content Detector', href: '/text-analysis/ai-detector', icon: 'smart_toy' },
    { title: 'Text Summarizer', href: '/text-analysis/text-summarizer', icon: 'compress' },
    { title: 'Article Rewriter', href: '/text-analysis/article-rewriter', icon: 'draw' },
    { title: 'Paraphrasing Tool', href: '/text-analysis/paraphrasing-tool', icon: 'autorenew' },
    { title: 'Grammar Checker', href: '/text-analysis/free-grammar-checker', icon: 'spellcheck' },
    { title: 'Word Counter', href: '/text-analysis/word-counter', icon: 'manage_search' },
    { title: 'XML Sitemap Generator', href: '/seo-backlinks/xml-sitemap-generator', icon: 'account_tree' },
    { title: 'Page Speed Test', href: '/seo-backlinks/page-speed-test', icon: 'speed' },
    { title: 'Meta Tag Generator', href: '/seo-backlinks/meta-tag-generator', icon: 'code' },
    { title: 'Keyword Position Tracker', href: '/seo-backlinks/keyword-position-tracker', icon: 'monitoring' },
    { title: 'Backlink Checker', href: '/seo-backlinks/backlink-checker', icon: 'link' },
    { title: 'Domain Authority Checker', href: '/seo-backlinks/domain-authority-checker', icon: 'domain' },
    { title: 'Reverse Image Search', href: '/images-pdf/reverse-image-search', icon: 'image_search' },
    { title: 'Image To Text Converter', href: '/text-analysis/image-to-text-converter', icon: 'document_scanner' },
    { title: 'PDF to Word', href: '/images-pdf/pdf-to-word', icon: 'description' },
    { title: 'Word to PDF', href: '/images-pdf/word-to-pdf', icon: 'picture_as_pdf' }
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTools = allTools.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

      useEffect(() => {
    // Simple Micro-interaction: Filter Pills and Search Filtering
    const searchInput = document.getElementById(
      "tool-search-input",
    ) as HTMLInputElement;
    const filterButtons = document.querySelectorAll(".filter-chip");
    const categoryBlocks = document.querySelectorAll(
      ".category-block",
    ) as NodeListOf<HTMLElement>;
    const toolPills = document.querySelectorAll(".tool-pill, .tool-card") as NodeListOf<HTMLElement>;

    // Category Filter Chips Click Handler
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => {
          b.classList.remove("bg-primary", "text-on-primary", "active");
          b.classList.add("bg-surface-card", "text-on-surface-variant");
        });
        btn.classList.remove("bg-surface-card", "text-on-surface-variant");
        btn.classList.add("bg-primary", "text-on-primary", "active");

        const cat = btn.getAttribute("data-cat");
        categoryBlocks.forEach((block) => {
          if (cat === "all" || block.getAttribute("data-category") === cat) {
            block.style.display = "flex";
          } else {
            block.style.display = "none";
          }
        });
        
        // Scroll down to show the result
        const dir = document.getElementById("tool-directory");
        if (dir) {
          const y = dir.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      });
    });

    // Realtime Search Filtering over Tool Pills
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        const query = target.value.toLowerCase().trim();
        toolPills.forEach((pill) => {
          const text = pill.textContent?.toLowerCase() || "";
          if (text.includes(query)) {
            pill.style.display = pill.classList.contains('tool-card') ? 'flex' : 'inline-flex';
          } else {
            pill.style.display = "none";
          }
        });

        // Ensure category blocks stay visible if any child pill matches
        categoryBlocks.forEach((block) => {
          const hasVisibleChildren = Array.from(
            block.querySelectorAll(".tool-pill, .tool-card"),
          ).some((p) => (p as HTMLElement).style.display !== "none");
          if (query === "" || hasVisibleChildren) {
            block.style.display = "flex";
          } else {
            block.style.display = "none";
          }
        });
      });

      // Quick Keyboard Shortcut (Cmd/Ctrl + K)
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="w-full pt-16 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          {/*  Subtle Ambient Glow Background  */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[980px] h-[360px] bg-gradient-to-b from-primary/10 via-accent-cyan/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>
            {/*  Hero / Instant Tool Finder Section  */}
            <section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop pt-space-xl pb-space-lg w-full flex flex-col items-center text-center relative z-30">
              {/*  Tag / Badge  */}
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-pill-tag-bg text-primary shadow-sm mb-space-md">
                <span
                  translate="no"
                  className="material-symbols-outlined text-[16px] text-accent-cyan notranslate"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider">
                  100+ Free Cloud-Powered Online Utilities
                </span>
              </div>
              {/*  Main Heading  */}
              <h1 className="font-headline-xl text-headline-xl text-on-surface max-w-3xl tracking-tight mb-space-sm">
                All-in-One{" "}
                <span className="text-primary">SEO &amp; Digital</span> Toolkit
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-xl">
                Instant, cloud-powered utilities for writers, webmasters, SEO
                agencies, and digital marketers trusted by over 10 million users
                globally.
              </p>
              {/*  Desktop Search Bar  */}
              <div className="w-full max-w-3xl bg-surface-card rounded-2xl shadow-xl p-space-xs flex items-center gap-space-sm relative z-50">
                <div className="flex items-center gap-space-sm flex-1 pl-space-md">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-primary text-[24px] notranslate"
                  >
                    search
                  </span>
                  <input
        className="w-full bg-transparent outline-none font-body-md text-body-md text-on-surface placeholder:text-text-muted"
        id="tool-search-input"
        placeholder="Search 100+ tools (e.g. Plagiarism, PDF to Word, AI Detector, Backlink)..."
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        
        
        autoComplete="off"
      />
                </div>
                <div className="hidden sm:flex items-center gap-1 bg-surface-subtle px-space-sm py-1 rounded text-text-muted font-label-sm text-label-sm">
                  <span>⌘</span>
                  <span>K</span>
                </div>
                <button
                  className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-xl py-space-md rounded-xl transition-all shadow-sm flex items-center gap-space-xs"
                  onClick={() => {
                      setSearchQuery("");
                      setShowDropdown(false);
                      document.getElementById('tool-directory')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  type="button"
                >
                  <span>Explore</span>
                  <span
                    translate="no"
                    className="material-symbols-outlined text-[18px] notranslate"
                  >
                    arrow_forward
                  </span>
                </button>
                
                {/* Search Dropdown */}
                {showDropdown && searchQuery.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-80 overflow-y-auto z-[9999] animate-in fade-in slide-in-from-top-2 text-left">
                    {filteredTools.length > 0 ? (
                      <ul className="py-2">
                          {filteredTools.map((tool, idx) => (
                            <li key={idx}>
                              <a
                                href={tool.href}
                                className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors"
                              >
                                <span translate="no" className="material-symbols-outlined text-gray-400 notranslate">{tool.icon}</span>
                                <span className="font-medium text-gray-800">{tool.title}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-6 py-8 text-center text-gray-500">
                          No tools found matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
{/*  Quick Category Filter Chips  */}
<div className="flex items-center justify-center flex-wrap gap-space-xs mt-space-lg max-w-4xl" id="filter-chips">
<button className="filter-chip active px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all flex items-center gap-1" data-cat="all">
<span>🔥</span> Trending
        </button>
<button className="filter-chip px-space-md py-space-xs rounded-full bg-surface-card hover:bg-pill-tag-bg text-on-surface-variant hover:text-primary font-label-md text-label-md shadow-sm transition-all" data-cat="text">
          Text Analysis
        </button>
<button className="filter-chip px-space-md py-space-xs rounded-full bg-surface-card hover:bg-pill-tag-bg text-on-surface-variant hover:text-primary font-label-md text-label-md shadow-sm transition-all" data-cat="seo">
          SEO &amp; Domains
        </button>
<button className="filter-chip px-space-md py-space-xs rounded-full bg-surface-card hover:bg-pill-tag-bg text-on-surface-variant hover:text-primary font-label-md text-label-md shadow-sm transition-all" data-cat="pdf">
          PDF &amp; Docs
        </button>
<button className="filter-chip px-space-md py-space-xs rounded-full bg-surface-card hover:bg-pill-tag-bg text-on-surface-variant hover:text-primary font-label-md text-label-md shadow-sm transition-all" data-cat="image">
          Images Editing
        </button>
<button className="filter-chip px-space-md py-space-xs rounded-full bg-surface-card hover:bg-pill-tag-bg text-on-surface-variant hover:text-primary font-label-md text-label-md shadow-sm transition-all" data-cat="design">
          Design Studio
        </button>
</div>
</section>
</div>
{/*  Popular Essentials Section (Top Used Tools Grid)  */}
<section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-lg w-full">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-xs">
<div>
<div className="flex items-center gap-space-xs mb-1">
<span className="material-symbols-outlined text-secondary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
<span className="font-headline-lg text-headline-lg text-on-surface">Popular Essentials</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Frequently used daily utilities with zero sign-up required</p>
</div>
<div className="flex items-center gap-space-xs text-primary font-label-md text-label-md">
<span>Verified real-time engine status</span>
<span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
</div>
</div>
{/*  6 Card Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
{/*  Card 1  */}
<a className="group bg-surface-card rounded-2xl p-space-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden" data-path="text-analysis" href="/text-analysis/plagiarism-checker">
<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[80px] pointer-events-none group-hover:scale-110 transition-transform"></div>
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="w-12 h-12 rounded-xl bg-pill-tag-bg text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-[26px]">manage_search</span>
</div>
<span className="px-space-sm py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm uppercase">#1 Top</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors mb-space-xs">Plagiarism Checker</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Deep multi-billion page crawl with accurate originality scores, sentence-level matching, and exportable PDF audit reports.</p>
</div>
<div className="flex items-center justify-between pt-space-sm border-t border-transparent text-primary font-label-md text-label-md">
<span className="text-text-muted font-body-sm text-body-sm">Up to 1,000 words/query</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</a>
{/*  Card 2  */}
<a className="group bg-surface-card rounded-2xl p-space-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden" data-path="text-analysis" href="/text-analysis/ai-detector">
<div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-[80px] pointer-events-none group-hover:scale-110 transition-transform"></div>
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="w-12 h-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
<span className="material-symbols-outlined text-[26px]">psychology</span>
</div>
<span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase">AI 4.0</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors mb-space-xs">AI Content Detector</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">High-precision pattern detector identifying ChatGPT, Claude 3.5, and Gemini synthetic text with sentence breakdown.</p>
</div>
<div className="flex items-center justify-between pt-space-sm text-secondary font-label-md text-label-md">
<span className="text-text-muted font-body-sm text-body-sm">99.4% Multi-model accuracy</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</a>
{/*  Card 3  */}
<a className="group bg-surface-card rounded-2xl p-space-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden" data-path="images-pdf" href="/images-pdf/reverse-image-search">
<div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/10 rounded-bl-[80px] pointer-events-none group-hover:scale-110 transition-transform"></div>
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
<span className="material-symbols-outlined text-[26px]">image_search</span>
</div>
<span className="px-space-sm py-0.5 rounded-full bg-pill-tag-bg text-primary font-label-sm text-label-sm uppercase">Multi-Engine</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors mb-space-xs">Reverse Image Search</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">One-click simultaneous lookup across Google Lens, Bing Visual, Yandex, and Baidu to find source files &amp; copyright infringements.</p>
</div>
<div className="flex items-center justify-between pt-space-sm text-primary font-label-md text-label-md">
<span className="text-text-muted font-body-sm text-body-sm">Drag &amp; drop or paste URL</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</a>
{/*  Card 4  */}
<a className="group bg-surface-card rounded-2xl p-space-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden" data-path="text-analysis" href="/text-analysis/paraphrasing-tool">
<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[80px] pointer-events-none group-hover:scale-110 transition-transform"></div>
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="w-12 h-12 rounded-xl bg-pill-tag-bg text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-[26px]">autorenew</span>
</div>
<span className="px-space-sm py-0.5 rounded-full bg-surface-subtle text-on-surface font-label-sm text-label-sm uppercase">Instant</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors mb-space-xs">Paraphrasing Tool</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Rephrase paragraphs effortlessly using creative, formal, and fluency modes while preserving semantic context and readability.</p>
</div>
<div className="flex items-center justify-between pt-space-sm text-primary font-label-md text-label-md">
<span className="text-text-muted font-body-sm text-body-sm">4 smart rewriting tones</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</a>
{/*  Card 5  */}
<a className="group bg-surface-card rounded-2xl p-space-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden" data-path="seo-backlinks" href="/seo-backlinks/seo-score-checker">
<div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-[80px] pointer-events-none group-hover:scale-110 transition-transform"></div>
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="w-12 h-12 rounded-xl bg-pill-tag-bg text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-[26px]">speed</span>
</div>
<span className="px-space-sm py-0.5 rounded-full bg-pill-tag-bg text-primary font-label-sm text-label-sm uppercase">Core Audit</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors mb-space-xs">Website SEO Score Checker</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Comprehensive 70+ point technical audit checking meta data, mobile responsiveness, Core Web Vitals, and indexing issues.</p>
</div>
<div className="flex items-center justify-between pt-space-sm text-primary font-label-md text-label-md">
<span className="text-text-muted font-body-sm text-body-sm">Export full white-label PDF</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</a>
{/*  Card 6  */}
<a className="group bg-surface-card rounded-2xl p-space-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden" data-path="images-pdf" href="/images-pdf/pdf-to-word">
<div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/10 rounded-bl-[80px] pointer-events-none group-hover:scale-110 transition-transform"></div>
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
<span className="material-symbols-outlined text-[26px]">picture_as_pdf</span>
</div>
<span className="px-space-sm py-0.5 rounded-full bg-pill-tag-bg text-tertiary font-label-sm text-label-sm uppercase">High Res</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-tertiary transition-colors mb-space-xs">PDF to Word Converter</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Lossless PDF to editable DOCX conversion with flawless table retention, vector fonts preservation, and zero file watermarks.</p>
</div>
<div className="flex items-center justify-between pt-space-sm text-tertiary font-label-md text-label-md">
<span className="text-text-muted font-body-sm text-body-sm">100% Client-side secure</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</a>
</div>
</section>
            {/*  Pro Banner (Hero Gradient Card)  */}
            <section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-md w-full">
<div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary via-primary-container to-secondary p-space-lg md:p-space-xl text-on-primary shadow-xl">
{/*  Subtle Decorative SVG pattern  */}
<div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
<svg fill="currentColor" height="340" viewBox="0 0 100 100" width="340">
<circle cx="50" cy="50" fill="none" r="48" stroke="currentColor" strokeWidth="4" />
<circle cx="50" cy="50" fill="none" r="30" stroke="currentColor" strokeWidth="3" />
<circle cx="50" cy="50" fill="currentColor" r="14" />
</svg>
</div>
<div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
<div className="max-w-2xl">
<div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-card/20 backdrop-blur-md text-on-primary font-label-sm text-label-sm mb-space-sm">
<span className="material-symbols-outlined text-[14px]">workspace_premium</span>
<span>SMALLSEOTOOLS PRO — UNLOCK INFINITE LIMITS</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-primary mb-space-xs tracking-tight">
            Accelerate Your Entire Content &amp; SEO Workflow
          </h2>
<p className="font-body-md text-body-md text-on-primary-container mb-space-md leading-relaxed">
            Get batch processing, 30,000-word plagiarism checks, zero advertisements, high-speed priority servers, and instant developer API access.
          </p>
<div className="flex flex-wrap items-center gap-space-md text-on-primary-container font-label-sm text-label-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-accent-cyan">check_circle</span> Unlimited Batch Queries</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-accent-cyan">check_circle</span> 100% Ad-Free Canvas</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-accent-cyan">check_circle</span> 256-Bit Strict Privacy</span>
</div>
</div>
<div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-space-sm">
<div className="text-left lg:text-right">
<div className="font-body-sm text-body-sm text-on-primary-container">Starting at only</div>
<div className="font-headline-xl text-headline-xl text-on-primary flex items-baseline gap-1">
              $4.99 <span className="font-body-sm text-body-sm text-on-primary-container">/ week</span>
</div>
<div className="font-label-sm text-label-sm text-accent-cyan">7-day money-back guarantee</div>
</div>
<a className="bg-surface-card hover:bg-surface-subtle text-primary font-label-lg text-label-lg px-space-xl py-space-md rounded-xl transition-all shadow-md flex items-center gap-space-xs whitespace-nowrap" data-path="pricing-plans" href="/pro">
<span>Explore Pro Plans</span>
<span className="material-symbols-outlined text-[18px]">bolt</span>
</a>
</div>
</div>
</div>
            </section>

            {/*  Categorized Tool Directory & Interactive Explorer  */}
            <section
              className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full"
              id="tool-directory"
            >
              <div className="text-center max-w-2xl mx-auto mb-space-xl">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
                  Explore Complete Tool Directory
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Browse hundreds of specialized digital utilities engineered for
                  peak accuracy and velocity.
                </p>
              </div>
              
              {/*  Category Grid  */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop">
                
                  {/*  Category 0: Trending  */}
                  <div
                    id="category-trending"
                    className="category-block bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between border border-gray-100"
                    data-category="trending"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-transparent">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                            <span translate="no" className="material-symbols-outlined text-[22px] notranslate">local_fire_department</span>
                          </div>
                          <h3 className="font-headline-md text-headline-md text-on-surface m-0">Trending Tools</h3>
                        </div>
                        <span className="text-sm font-medium text-orange-500 bg-orange-50 px-3 py-1 rounded-full">Top 6</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                        <a href="/text-analysis/plagiarism-checker" className="tool-card group flex flex-col items-center gap-3 w-full text-center p-2 transition-all cursor-pointer">
                          <div className="w-[80px] h-[80px] rounded-2xl bg-white flex items-center justify-center border-2 border-[#E2E8F0] shadow-sm group-hover:border-[#1961A5] group-hover:shadow-md transition-all duration-300">
                            <span translate="no" className="material-symbols-outlined text-[36px] text-[#1961A5] notranslate font-light group-hover:scale-110 transition-transform duration-300">find_in_page</span>
                          </div>
                          <span className="font-medium text-[13px] sm:text-[14px] text-gray-800 px-1 leading-snug">Plagiarism Checker</span>
                        </a>
                        <a href="/text-analysis/ai-detector" className="tool-card group flex flex-col items-center gap-3 w-full text-center p-2 transition-all cursor-pointer">
                          <div className="w-[80px] h-[80px] rounded-2xl bg-white flex items-center justify-center border-2 border-[#E2E8F0] shadow-sm group-hover:border-[#1961A5] group-hover:shadow-md transition-all duration-300">
                            <span translate="no" className="material-symbols-outlined text-[36px] text-[#1961A5] notranslate font-light group-hover:scale-110 transition-transform duration-300">smart_toy</span>
                          </div>
                          <span className="font-medium text-[13px] sm:text-[14px] text-gray-800 px-1 leading-snug">AI Content Detector</span>
                        </a>
                        <a href="/text-analysis/paraphrasing-tool" className="tool-card group flex flex-col items-center gap-3 w-full text-center p-2 transition-all cursor-pointer">
                          <div className="w-[80px] h-[80px] rounded-2xl bg-white flex items-center justify-center border-2 border-[#E2E8F0] shadow-sm group-hover:border-[#1961A5] group-hover:shadow-md transition-all duration-300">
                            <span translate="no" className="material-symbols-outlined text-[36px] text-[#1961A5] notranslate font-light group-hover:scale-110 transition-transform duration-300">autorenew</span>
                          </div>
                          <span className="font-medium text-[13px] sm:text-[14px] text-gray-800 px-1 leading-snug">Paraphrasing Tool</span>
                        </a>
                        <a href="/text-analysis/word-counter" className="tool-card group flex flex-col items-center gap-3 w-full text-center p-2 transition-all cursor-pointer">
                          <div className="w-[80px] h-[80px] rounded-2xl bg-white flex items-center justify-center border-2 border-[#E2E8F0] shadow-sm group-hover:border-[#1961A5] group-hover:shadow-md transition-all duration-300">
                            <span translate="no" className="material-symbols-outlined text-[36px] text-[#1961A5] notranslate font-light group-hover:scale-110 transition-transform duration-300">manage_search</span>
                          </div>
                          <span className="font-medium text-[13px] sm:text-[14px] text-gray-800 px-1 leading-snug">Word Counter</span>
                        </a>
                        <a href="/seo-backlinks/seo-score-checker" className="tool-card group flex flex-col items-center gap-3 w-full text-center p-2 transition-all cursor-pointer">
                          <div className="w-[80px] h-[80px] rounded-2xl bg-white flex items-center justify-center border-2 border-[#E2E8F0] shadow-sm group-hover:border-[#1961A5] group-hover:shadow-md transition-all duration-300">
                            <span translate="no" className="material-symbols-outlined text-[36px] text-[#1961A5] notranslate font-light group-hover:scale-110 transition-transform duration-300">speed</span>
                          </div>
                          <span className="font-medium text-[13px] sm:text-[14px] text-gray-800 px-1 leading-snug">SEO Score Checker</span>
                        </a>
                        <a href="/images-pdf/pdf-to-word" className="tool-card group flex flex-col items-center gap-3 w-full text-center p-2 transition-all cursor-pointer">
                          <div className="w-[80px] h-[80px] rounded-2xl bg-white flex items-center justify-center border-2 border-[#E2E8F0] shadow-sm group-hover:border-[#1961A5] group-hover:shadow-md transition-all duration-300">
                            <span translate="no" className="material-symbols-outlined text-[36px] text-[#1961A5] notranslate font-light group-hover:scale-110 transition-transform duration-300">picture_as_pdf</span>
                          </div>
                          <span className="font-medium text-[13px] sm:text-[14px] text-gray-800 px-1 leading-snug">PDF To Word</span>
                        </a>
                      </div>
                    </div>
                    <div className="mt-space-md text-right">
                    <a href="/text-analysis" className="text-primary font-label-md text-label-md hover:underline flex items-center justify-end gap-1">
                      See Top Tools <span translate="no" className="material-symbols-outlined text-[16px] notranslate">arrow_forward</span>
                    </a>
                  </div>
                </div>

                {/*  Category 1: Text Analysis  */}
              <div
                className="category-block bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between border border-gray-100"
                id="category-text" data-category="text"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-transparent">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-xl bg-pill-tag-bg text-primary flex items-center justify-center">
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[22px] notranslate"
                        >
                          spellcheck
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          Text Analysis Tools
                        </h3>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Grammar, rewriters, AI verification, and OCR utilities
                        </span>
                      </div>
                    </div>
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-subtle text-primary font-label-sm text-label-sm">
                      19 Tools
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-space-xs">
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/plagiarism-checker"
                    >
                      <span>Plagiarism Checker</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/article-rewriter"
                    >
                      <span>Article Rewriter</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/free-grammar-checker"
                    >
                      <span>Free Grammar Checker</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/paraphrasing-tool"
                    >
                      <span>Paraphrasing Tool</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/ai-detector"
                    >
                      <span>AI Content Detector</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/ai-humanizer"
                    >
                      <span>AI Humanizer</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/text-summarizer"
                    >
                      <span>Text Summarizer</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/image-to-text-converter"
                    >
                      <span>Image To Text Converter</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/citation-generator"
                    >
                      <span>Citation Generator</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/uppercase-to-lowercase"
                    >
                      <span>Uppercase To Lowercase</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="text-analysis"
                      href="/text-analysis/speech-to-text"
                    >
                      <span>Speech To Text</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                  </div>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>Supported in 22+ international languages</span>
                  <a
                    className="text-primary hover:underline font-label-md text-label-md flex items-center gap-1"
                    data-path="text-analysis"
                    href="/text-analysis"
                  >
                    View all 19 text tools{" "}
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[16px] notranslate"
                    >
                      chevron_right
                    </span>
                  </a>
                </div>
              </div>
              {/*  Category 2: SEO & Web Management  */}
              <div
                className="category-block bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between border border-gray-100"
                id="category-seo" data-category="seo"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-transparent">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-xl bg-pill-tag-bg text-primary flex items-center justify-center">
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[22px] notranslate"
                        >
                          troubleshoot
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          SEO &amp; Web Management
                        </h3>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Crawlers, backlinks, authority checks, and site
                          architecture
                        </span>
                      </div>
                    </div>
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-subtle text-primary font-label-sm text-label-sm">
                      24 Tools
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-space-xs">
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/seo-score-checker"
                    >
                      <span>Website SEO Score Checker</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/backlink-checker"
                    >
                      <span>Backlink Checker</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/domain-authority-checker"
                    >
                      <span>Domain Authority Checker</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/keyword-position-tracker"
                    >
                      <span>Keyword Position Tracker</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/xml-sitemap-generator"
                    >
                      <span>XML Sitemap Generator</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/page-speed-test"
                    >
                      <span>Page Speed Test</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/meta-tag-generator"
                    >
                      <span>Meta Tag Generator</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/robots.txt-generator"
                    >
                      <span>Robots.txt Generator</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/mobile-friendly-test"
                    >
                      <span>Mobile Friendly Test</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="seo-backlinks"
                      href="/seo-backlinks/domain-age-checker"
                    >
                      <span>Domain Age Checker</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                  </div>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>Real-time crawler data &amp; indexing feeds</span>
                  <a
                    className="text-primary hover:underline font-label-md text-label-md flex items-center gap-1"
                    data-path="seo-backlinks"
                    href="/seo-backlinks"
                  >
                    View all 24 SEO tools{" "}
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[16px] notranslate"
                    >
                      chevron_right
                    </span>
                  </a>
                </div>
              </div>
              {/*  Category 3: Online PDF Tools  */}
              <div
                className="category-block bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between border border-gray-100"
                id="category-pdf" data-category="pdf"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-transparent">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[22px] notranslate"
                        >
                          description
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          Online PDF Tools
                        </h3>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Merge, convert, compress, unlock, and format documents
                        </span>
                      </div>
                    </div>
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-subtle text-tertiary font-label-sm text-label-sm">
                      18 Tools
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-space-xs">
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/pdf-to-word"
                    >
                      <span>PDF To Word</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/word-to-pdf"
                    >
                      <span>Word To PDF</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/merge-pdf"
                    >
                      <span>Merge PDF</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/compress-pdf"
                    >
                      <span>Compress PDF</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/split-pdf"
                    >
                      <span>Split PDF</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/unlock-pdf"
                    >
                      <span>Unlock PDF</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/pdf-to-jpg"
                    >
                      <span>PDF To JPG</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/compress-pdf-to-100kb"
                    >
                      <span>Compress PDF to 100KB</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/excel-to-pdf"
                    >
                      <span>Excel To PDF</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                  </div>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>Files automatically purged after 60 minutes</span>
                  <a
                    className="text-primary hover:underline font-label-md text-label-md flex items-center gap-1"
                    data-path="images-pdf"
                    href="/images-pdf"
                  >
                    View all 18 PDF tools{" "}
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[16px] notranslate"
                    >
                      chevron_right
                    </span>
                  </a>
                </div>
              </div>
              {/*  Category 4: Images Editing & Studio  */}
              <div
                className="category-block bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between border border-gray-100"
                id="category-image" data-category="image"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-transparent">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[22px] notranslate"
                        >
                          photo_library
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          Images &amp; Creative Studio
                        </h3>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Compress, convert, brand design, and multi-engine
                          reverse search
                        </span>
                      </div>
                    </div>
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-subtle text-secondary font-label-sm text-label-sm">
                      22 Tools
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-space-xs">
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/images-pdf/reverse-image-search"
                    >
                      <span>Reverse Image Search</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/image-tools/image-compressor"
                    >
                      <span>Image Compressor</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/image-tools/favicon-generator"
                    >
                      <span>Favicon Generator</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/image-tools/video-to-gif-converter"
                    >
                      <span>Video To GIF Converter</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/image-tools/compress-image-to-50kb"
                    >
                      <span>Compress Image to 50KB</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/image-tools/svg-converter"
                    >
                      <span>SVG Converter</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/image-tools/logo-maker"
                    >
                      <span>Logo Maker</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/image-tools/resume-builder"
                    >
                      <span>Resume Builder</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                    <a
                      className="tool-pill px-space-md py-space-xs rounded-xl bg-surface-subtle hover:bg-pill-tag-bg text-on-surface hover:text-primary font-label-md text-label-md transition-all shadow-xs flex items-center gap-1"
                      data-path="images-pdf"
                      href="/text-analysis/json-viewer"
                    >
                      <span>JSON Viewer</span>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[14px] text-text-muted notranslate"
                      >
                        north_east
                      </span>
                    </a>
                  </div>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>
                    High-fidelity lossless raster &amp; vector rendering
                  </span>
                  <a
                    className="text-secondary hover:underline font-label-md text-label-md flex items-center gap-1"
                    data-path="images-pdf"
                    href="/image-tools"
                  >
                    View all 22 creative tools{" "}
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[16px] notranslate"
                    >
                      chevron_right
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/*  Value Propositions / Feature Highlights  */}
          <section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-lg w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
              <div className="bg-surface-card rounded-2xl p-space-lg shadow-sm flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-pill-tag-bg text-primary flex items-center justify-center mb-space-md">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-[26px] notranslate"
                  >
                    verified_user
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                  100% Free &amp; Private
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Your input content, documents, and uploaded assets are never
                  archived or reused for model training. Session data
                  automatically deletes after analysis.
                </p>
              </div>
              <div className="bg-surface-card rounded-2xl p-space-lg shadow-sm flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center mb-space-md">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-[26px] notranslate"
                  >
                    bolt
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                  Instant Cloud Processing
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Powered by distributed compute clusters for near-instant
                  rendering, live indexing checks, and rapid OCR scanning
                  without client-side lag.
                </p>
              </div>
              <div className="bg-surface-card rounded-2xl p-space-lg shadow-sm flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-space-md">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-[26px] notranslate"
                  >
                    precision_manufacturing
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                  Accurate Multi-Engine Tech
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Combines data from industry-leading backlink crawlers, neural
                  language models, and search indexers to deliver unmatched
                  accuracy.
                </p>
              </div>
            </div>
          </section>
          {/*  Social Proof & Trust Badges  */}
          <section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
            <div className="bg-surface-card rounded-2xl p-space-lg shadow-sm text-center">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-text-muted mb-space-md block">
                As Seen &amp; Trusted By Webmasters At Leading Digital Brands
              </span>
              <div className="flex flex-wrap items-center justify-around gap-space-lg opacity-75 grayscale hover:grayscale-0 transition-all">
                <div className="flex items-center gap-space-xs font-headline-md text-headline-md text-on-surface font-extrabold tracking-tighter">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-primary text-[28px] notranslate"
                  >
                    insights
                  </span>{" "}
                  Ahrefs
                </div>
                <div className="flex items-center gap-space-xs font-headline-md text-headline-md text-on-surface font-black tracking-tight">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-secondary text-[28px] notranslate"
                  >
                    search_check
                  </span>{" "}
                  SEMRUSH
                </div>
                <div className="flex items-center gap-space-xs font-headline-md text-headline-md text-on-surface font-serif tracking-widest">
                  Forbes
                </div>
                <div className="flex items-center gap-space-xs font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-primary text-[28px] notranslate"
                  >
                    article
                  </span>{" "}
                  SearchEngineJournal
                </div>
                <div className="flex items-center gap-space-xs font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                  <span className="text-primary font-black">P</span> Product
                  Hunt
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
