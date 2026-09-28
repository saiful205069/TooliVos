"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const imageTools = [
  {
    name: "Reverse Image Search",
    slug: "reverse-image-search",
    icon: "image_search",
  },
  { name: "Face Search", slug: "face-search", icon: "face" },
  { name: "Image Compressor", slug: "image-compressor", icon: "compress" },
  { name: "Favicon Generator", slug: "favicon-generator", icon: "stars" },
  {
    name: "Video To GIF Converter",
    slug: "video-to-gif-converter",
    icon: "gif",
  },
  {
    name: "Compress image to 50KB",
    slug: "compress-image-to-50kb",
    icon: "compress",
  },
  {
    name: "Compress image to 20KB",
    slug: "compress-image-to-20kb",
    icon: "compress",
  },
  {
    name: "Compress JPEG to 100KB",
    slug: "compress-jpeg-to-100kb",
    icon: "compress",
  },
  {
    name: "Compress JPEG to 200KB",
    slug: "compress-jpeg-to-200kb",
    icon: "compress",
  },
  { name: "Compress JPG", slug: "compress-jpg", icon: "compress" },
  {
    name: "Compress Image To 1MB",
    slug: "compress-image-to-1mb",
    icon: "compress",
  },
  { name: "SVG Converter", slug: "svg-converter", icon: "transform" },
  {
    name: "Face Shape Detector",
    slug: "face-shape-detector",
    icon: "face_retouching_natural",
  },
  { name: "Ai Image Detector", slug: "ai-image-detector", icon: "memory" },
  { name: "Image Converter", slug: "image-converter", icon: "transform" },
];

export default function ImageToolsDirectory() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 md:p-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-[32px] font-bold text-[#1A202C] mb-4">
              Images Editing Tools
            </h1>
            <p className="text-[16px] text-gray-500 leading-relaxed">
              Create a favicon, compress an image or resize a picture with a
              single click. All essentials for image editing are available in
              one place.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6">
            {imageTools.map((tool, idx) => (
              <Link
                href={`/image-tools/${tool.slug}`}
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
