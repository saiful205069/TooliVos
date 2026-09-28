"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pdfTools = [
  { name: "Merge PDF", slug: "merge-pdf", icon: "call_merge" },
  { name: "Rotate PDF", slug: "rotate-pdf", icon: "rotate_right" },
  { name: "Unlock PDF", slug: "unlock-pdf", icon: "lock_open" },
  { name: "Lock PDF", slug: "lock-pdf", icon: "lock" },
  { name: "PDF To Word", slug: "pdf-to-word", icon: "description" },
  { name: "Word To PDF", slug: "word-to-pdf", icon: "picture_as_pdf" },
  { name: "PDF To JPG", slug: "pdf-to-jpg", icon: "image" },
  { name: "PowerPoint To PDF", slug: "powerpoint-to-pdf", icon: "slideshow" },
  { name: "Compress PDF", slug: "compress-pdf", icon: "compress" },
  { name: "Excel To PDF", slug: "excel-to-pdf", icon: "table_view" },
  { name: "Split PDF", slug: "split-pdf", icon: "call_split" },
  {
    name: "Compress PDF to 50KB",
    slug: "compress-pdf-to-50kb",
    icon: "compress",
  },
  {
    name: "Compress PDF to 100KB",
    slug: "compress-pdf-to-100kb",
    icon: "compress",
  },
  {
    name: "Compress PDF to 150KB",
    slug: "compress-pdf-to-150kb",
    icon: "compress",
  },
  {
    name: "Compress PDF to 200KB",
    slug: "compress-pdf-to-200kb",
    icon: "compress",
  },
  {
    name: "Resize PDF to 200KB",
    slug: "resize-pdf-to-200kb",
    icon: "aspect_ratio",
  },
  {
    name: "Compress PDF to 300KB",
    slug: "compress-pdf-to-300kb",
    icon: "compress",
  },
  {
    name: "Compress PDF to 500KB",
    slug: "compress-pdf-to-500kb",
    icon: "compress",
  },
  {
    name: "Compress PDF to 1MB",
    slug: "compress-pdf-to-1mb",
    icon: "compress",
  },
  {
    name: "Compress PDF to 2MB",
    slug: "compress-pdf-to-2mb",
    icon: "compress",
  },
  { name: "PDF to ZIP", slug: "pdf-to-zip", icon: "folder_zip" },
];

export default function PdfDirectory() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 md:p-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-[32px] font-bold text-[#1A202C] mb-4">
              Online PDF Tools
            </h1>
            <p className="text-[16px] text-gray-500 leading-relaxed">
              All the tools you need to work with PDF files, at your fingertips.
              Merge, rotate, unlock, lock, watermark and convert PDFs with just
              a few clicks.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6">
            {pdfTools.map((tool, idx) => (
              <Link
                href={`/images-pdf/${tool.slug}`}
                key={idx}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-50 flex items-center justify-center mb-4 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.15)] group-hover:border-[#0066FF]/20">
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
