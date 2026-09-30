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
                <a
                  href={`/image-tools/${tool.slug}`}
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
