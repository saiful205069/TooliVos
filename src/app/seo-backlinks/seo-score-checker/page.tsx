"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AuditResult {
  score: number;
  title: string;
  description: string;
  good_points: string[];
  errors: string[];
  warnings: string[];
  stats: {
    word_count: number;
    images_without_alt: number;
  };
}

export default function SeoScoreChecker() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let targetUrl = url;
    if (!targetUrl.startsWith("http")) {
      targetUrl = "https://" + targetUrl;
      setUrl(targetUrl);
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await res.json();

      if (data.error === "API_KEY_MISSING" || data.error === "API_ERROR") {
        if (data.fallback) {
          setResult(data.fallback);
          setErrorMessage(data.message || "Using demo mode due to API error.");
        } else {
          setErrorMessage(data.message || data.error);
        }
      } else if (data.error) {
        setErrorMessage(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setErrorMessage("Failed to connect to the server.");
    }

    setIsProcessing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
              <span
                translate="no"
                className="material-symbols-outlined text-3xl notranslate"
              >
                speed
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Website SEO Score Checker
            </h1>
            <p className="text-on-surface-variant text-lg">
              Enter any URL to get an instant AI-powered technical SEO audit. We
              check meta tags, structure, and on-page elements.
            </p>
          </div>

          <div className="bg-surface-card rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto mb-8">
            <form
              onSubmit={handleAudit}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <span
                  translate="no"
                  className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted notranslate"
                >
                  link
                </span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-surface-subtle border border-gray-200 rounded-xl pl-12 pr-4 py-4 outline-none text-on-surface focus:border-primary transition-colors text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isProcessing || !url}
                className="bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-bold px-8 py-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-lg"
              >
                {isProcessing ? (
                  <>
                    <span
                      translate="no"
                      className="material-symbols-outlined animate-spin notranslate"
                    >
                      progress_activity
                    </span>{" "}
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span
                      translate="no"
                      className="material-symbols-outlined notranslate"
                    >
                      search
                    </span>{" "}
                    Audit Now
                  </>
                )}
              </button>
            </form>

            {errorMessage && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl text-orange-800 text-sm flex items-start gap-2">
                <span
                  translate="no"
                  className="material-symbols-outlined notranslate"
                >
                  warning
                </span>
                <p>{errorMessage}</p>
              </div>
            )}
          </div>

          {result && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Score Header */}
              <div className="bg-surface-card rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-gray-100"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={getScoreColor(result.score)}
                      strokeDasharray={`${result.score}, 100`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className={`text-4xl font-black ${getScoreColor(result.score)}`}
                    >
                      {result.score}
                    </span>
                    <span className="text-xs font-bold text-text-muted uppercase">
                      out of 100
                    </span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">
                    Overall SEO Health
                  </h2>
                  <p className="text-on-surface-variant mb-4">
                    {result.score >= 80
                      ? "Great job! This page is well optimized for search engines."
                      : result.score >= 50
                        ? "Needs improvement. There are some critical issues holding this page back."
                        : "Poor SEO health. This page requires significant technical improvements."}
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <div className="bg-surface p-3 rounded-xl border border-gray-100 min-w-[120px]">
                      <p className="text-xs text-text-muted font-bold uppercase mb-1">
                        Word Count
                      </p>
                      <p className="font-bold text-lg">
                        {result.stats?.word_count || 0}
                      </p>
                    </div>
                    <div className="bg-surface p-3 rounded-xl border border-gray-100 min-w-[120px]">
                      <p className="text-xs text-text-muted font-bold uppercase mb-1">
                        Missing Alt Texts
                      </p>
                      <p className="font-bold text-lg text-orange-500">
                        {result.stats?.images_without_alt || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta Data */}
              <div className="bg-surface-card rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-primary notranslate"
                  >
                    visibility
                  </span>
                  Meta Tags & Snippet Preview
                </h3>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
                  <p className="text-sm text-gray-500 mb-1">{url}</p>
                  <h4 className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 line-clamp-1">
                    {result.title || "No Title Tag Found"}
                  </h4>
                  <p className="text-sm text-[#4d5156] line-clamp-2">
                    {result.description ||
                      "No Meta Description Found. Search engines will pick random text from the page."}
                  </p>
                </div>
              </div>

              {/* Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Errors */}
                <div className="bg-red-50/50 rounded-3xl p-6 border border-red-100">
                  <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                    <span
                      translate="no"
                      className="material-symbols-outlined text-red-500 notranslate"
                    >
                      cancel
                    </span>
                    Critical Errors ({result.errors?.length || 0})
                  </h3>
                  <ul className="space-y-3">
                    {result.errors?.map((err, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-red-900 bg-white p-3 rounded-lg border border-red-100"
                      >
                        <span
                          translate="no"
                          className="material-symbols-outlined text-red-500 text-[18px] shrink-0 notranslate"
                        >
                          error
                        </span>
                        {err}
                      </li>
                    ))}
                    {(!result.errors || result.errors.length === 0) && (
                      <p className="text-sm text-red-400 font-medium">
                        No critical errors found.
                      </p>
                    )}
                  </ul>
                </div>

                {/* Warnings */}
                <div className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100">
                  <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                    <span
                      translate="no"
                      className="material-symbols-outlined text-orange-500 notranslate"
                    >
                      warning
                    </span>
                    Warnings ({result.warnings?.length || 0})
                  </h3>
                  <ul className="space-y-3">
                    {result.warnings?.map((warn, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-orange-900 bg-white p-3 rounded-lg border border-orange-100"
                      >
                        <span
                          translate="no"
                          className="material-symbols-outlined text-orange-500 text-[18px] shrink-0 notranslate"
                        >
                          warning
                        </span>
                        {warn}
                      </li>
                    ))}
                    {(!result.warnings || result.warnings.length === 0) && (
                      <p className="text-sm text-orange-400 font-medium">
                        No warnings found.
                      </p>
                    )}
                  </ul>
                </div>

                {/* Good Points */}
                <div className="bg-green-50/50 rounded-3xl p-6 border border-green-100 md:col-span-2">
                  <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span
                      translate="no"
                      className="material-symbols-outlined text-green-500 notranslate"
                    >
                      check_circle
                    </span>
                    Passed Audits ({result.good_points?.length || 0})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.good_points?.map((good, i) => (
                      <div
                        key={i}
                        className="flex gap-2 text-sm text-green-900 bg-white p-3 rounded-lg border border-green-100"
                      >
                        <span
                          translate="no"
                          className="material-symbols-outlined text-green-500 text-[18px] shrink-0 notranslate"
                        >
                          check
                        </span>
                        {good}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      
      <section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-4">About Website SEO Score Checker</h2>
          <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
            Audit your website's technical and on-page SEO health with our comprehensive SEO Score Checker. In today's competitive digital landscape, a flawless website architecture is critical for Google rankings. This tool scans your URL for meta tags, headings, mobile responsiveness, Core Web Vitals, and potential indexing issues, providing an actionable roadmap to boost your organic traffic.
          </p>
          
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">How to Use This Tool</h3>
          <ol className="space-y-4">
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Enter the full URL (e.g., https://example.com) of the page you want to audit.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Click "Analyze" to let our crawlers fetch and evaluate the page.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Review your overall SEO score and the detailed breakdown of warnings and errors.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                4
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Follow the recommended fixes to improve your site's search engine visibility.</p>
            </li>
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
