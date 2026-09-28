"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const textTools = [
  {
    name: "Plagiarism Checker",
    slug: "plagiarism-checker",
    icon: "plagiarism",
  },
  { name: "Article Rewriter", slug: "article-rewriter", icon: "edit_document" },
  {
    name: "Free Grammar Checker",
    slug: "free-grammar-checker",
    icon: "spellcheck",
  },
  { name: "Paraphrasing Tool", slug: "paraphrasing-tool", icon: "sync_alt" },
  {
    name: "Uppercase To Lowercase",
    slug: "uppercase-to-lowercase",
    icon: "match_case",
  },
  {
    name: "Image To Text Converter",
    slug: "image-to-text-converter",
    icon: "document_scanner",
  },
  { name: "Text To Image", slug: "text-to-image", icon: "image" },
  { name: "JPG To Word", slug: "jpg-to-word", icon: "text_snippet" },
  {
    name: "Small Text Generator",
    slug: "small-text-generator",
    icon: "format_size",
  },
  { name: "Online Text Editor", slug: "online-text-editor", icon: "edit_note" },
  { name: "Speech To Text", slug: "speech-to-text", icon: "mic" },
  { name: "AI Content Detector", slug: "ai-detector", icon: "memory" },
  { name: "Text Summarizer", slug: "text-summarizer", icon: "summarize" },
  { name: "OCR", slug: "ocr", icon: "document_scanner" },
  { name: "Image Translator", slug: "image-translator", icon: "translate" },
  {
    name: "Citation Generator",
    slug: "citation-generator",
    icon: "format_quote",
  },
  {
    name: "Invisible Character",
    slug: "invisible-character",
    icon: "visibility_off",
  },
  { name: "AI Writer", slug: "ai-writer", icon: "draw" },
  { name: "AI Humanizer", slug: "ai-humanizer", icon: "smart_toy" },
];

export default function TextAnalysisDirectory() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 md:p-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-[32px] font-bold text-[#1A202C] mb-4">
              Text Analysis Tools
            </h1>
            <p className="text-[16px] text-gray-500 leading-relaxed">
              A complete set of text tools is now at your fingertips. Check
              plagiarism, rewrite an article, run a spell checker, count words
              or change text case.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6">
            {textTools.map((tool, idx) => (
              <Link
                href={`/text-analysis/${tool.slug}`}
                key={idx}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-50 flex items-center justify-center mb-4 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.15)] group-hover:border-primary/20">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-[32px] text-[#0066FF] opacity-90 notranslate"
                  >
                    {tool.icon}
                  </span>
                </div>
                <span className="text-center font-bold text-[#2D3748] text-sm leading-snug px-2 group-hover:text-[#0066FF] transition-colors">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
