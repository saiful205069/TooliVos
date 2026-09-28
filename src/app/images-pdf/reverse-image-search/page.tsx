"use client";
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReverseImageSearch() {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setPreviewUrl(e.target.value);
    setSelectedFile(null);
    setAnalysisResult(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImageUrl("");
      setAnalysisResult(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!previewUrl) return;

    setIsProcessing(true);
    setAnalysisResult(null);

    try {
      // If it's a file, we already have base64 in previewUrl
      let base64 = previewUrl;
      let mime = selectedFile?.type || "image/jpeg";

      // If it's a URL, we need to fetch it and convert to base64
      if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        mime = blob.type;
        base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const res = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType: mime }),
      });
      const data = await res.json();
      setAnalysisResult(data.analysis);
    } catch (error) {
      setAnalysisResult("❌ Error: Could not analyze the image.");
    }
    setIsProcessing(false);
  };

  const openSearch = (engine: string) => {
    if (!imageUrl) {
      alert(
        "Please enter a direct Image URL to use search engines, or use AI Analysis for local files.",
      );
      return;
    }
    const encoded = encodeURIComponent(imageUrl);
    let url = "";
    if (engine === "google")
      url = `https://lens.google.com/uploadbyurl?url=${encoded}`;
    if (engine === "bing")
      url = `https://www.bing.com/images/search?view=detailv2&iss=sbi&q=imgurl:${encoded}`;
    if (engine === "tineye") url = `https://tineye.com/search?url=${encoded}`;
    if (engine === "yandex")
      url = `https://yandex.com/images/search?rpt=imageview&url=${encoded}`;

    if (url) window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Reverse Image Search & AI Analysis
            </h1>
            <p className="text-on-surface-variant">
              Find image sources, visually similar photos, and use AI to deeply
              analyze the contents of any picture.
            </p>
          </div>

          <div className="bg-surface-card rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Input Section */}
              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-surface-subtle border border-gray-200 rounded-xl px-4 py-3 outline-none text-on-surface focus:border-primary transition-colors"
                  />
                </div>

                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-surface-card px-3 text-sm font-bold text-text-muted">
                      OR
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">
                    Upload File
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-300 hover:border-primary bg-surface-subtle hover:bg-primary/5 rounded-xl p-8 text-center cursor-pointer transition-colors"
                  >
                    <span
                      translate="no"
                      className="material-symbols-outlined text-4xl text-text-muted mb-2 notranslate"
                    >
                      cloud_upload
                    </span>
                    <p className="font-bold text-on-surface">
                      Click to browse or drag & drop
                    </p>
                    <p className="text-sm text-text-muted mt-1">
                      JPG, PNG, GIF, WebP (Max 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>

                {/* Search Engine Buttons (URL Only) */}
                {imageUrl && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-bold mb-3">
                      Search Engines (URL Only)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openSearch("google")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors"
                      >
                        Google Lens
                      </button>
                      <button
                        onClick={() => openSearch("bing")}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors"
                      >
                        Bing
                      </button>
                      <button
                        onClick={() => openSearch("tineye")}
                        className="bg-blue-400 hover:bg-blue-500 text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors"
                      >
                        TinEye
                      </button>
                      <button
                        onClick={() => openSearch("yandex")}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors"
                      >
                        Yandex
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview & Analysis Section */}
              <div className="flex-1 flex flex-col border border-gray-200 rounded-xl bg-surface overflow-hidden">
                <div className="p-4 bg-surface-subtle border-b border-gray-200 flex justify-between items-center">
                  <span className="font-bold text-sm">
                    Image Preview & Analysis
                  </span>
                  {previewUrl && (
                    <button
                      onClick={handleAnalyze}
                      disabled={isProcessing}
                      className="bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary text-sm font-bold px-4 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      {isProcessing ? "Analyzing..." : "AI Analysis ✨"}
                    </button>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col relative">
                  {!previewUrl ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
                      <span
                        translate="no"
                        className="material-symbols-outlined text-5xl mb-2 opacity-50 notranslate"
                      >
                        image
                      </span>
                      <p>No image selected</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      {isProcessing && (
                        <div className="flex items-center gap-2 text-primary">
                          <span
                            translate="no"
                            className="material-symbols-outlined animate-spin notranslate"
                          >
                            progress_activity
                          </span>
                          <span className="font-bold">
                            Gemini Vision is analyzing the image...
                          </span>
                        </div>
                      )}

                      {analysisResult && !isProcessing && (
                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-sm text-on-surface-variant whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                          {analysisResult}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      
      <section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-4">About Reverse Image Search</h2>
          <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
            Discover the origin, copyright status, and visually similar instances of any image across the web with our multi-engine Reverse Image Search. This tool queries Google, Bing, and Yandex simultaneously, making it an invaluable resource for photographers protecting their work, journalists verifying sources, and shoppers looking for identical products online.
          </p>
          
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">How to Use This Tool</h3>
          <ol className="space-y-4">
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Upload an image from your device or paste an image URL.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Click "Search Image" to broadcast the query across multiple search engines.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Browse through the exact matches and visually similar results.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                4
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Click on any result link to trace the image back to its original source.</p>
            </li>
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
