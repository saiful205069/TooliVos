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
                <a
                  href={`/text-analysis/${tool.slug}`}
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
      </main>

      <Footer />
    </div>
  );
}
