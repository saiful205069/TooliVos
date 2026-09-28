"use client";
import React, { useState } from "react";
import Header from "@/components/Header";


import Footer from "@/components/Footer";
import ToolInfo from "@/components/ToolInfo";
import { useAuth } from "@/context/AuthContext";

export default function GenericPdfPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const resolvedParams = React.use(params);
  const toolSlug = resolvedParams.tool;
  const { openLoginModal, user } = useAuth();

  // Convert slug to Title Case
  const toolName = toolSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    filename: string;
  } | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleProcess = async () => {
    if (!user) {
      openLoginModal();
      return;
    }
    if (!file) return;

    setIsProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("toolSlug", toolSlug);
      formData.append("toolName", toolName);

      const response = await fetch("/api/generic-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to process");

      setResult({ message: data.message, filename: data.filename });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-[800px] mx-auto px-margin-desktop">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-display-sm font-display-sm tracking-tight text-on-surface mb-4">
              {toolName}
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Secure, fast, and completely free online {toolName.toLowerCase()}{" "}
              tool. Drop your files below to get started.
            </p>
          </div>

          <div className="bg-surface-card rounded-3xl shadow-sm border border-gray-100 p-space-xl text-center">
            {result ? (
              <div className="flex flex-col items-center py-10 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-[40px] notranslate"
                  >
                    check_circle
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">
                  Success!
                </h3>
                <p className="text-on-surface-variant mb-8">{result.message}</p>
                <button
                  onClick={() => {
                    // Simulate download
                    alert(`Downloading simulated file: ${result.filename}`);
                  }}
                  className="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2"
                >
                  <span
                    translate="no"
                    className="material-symbols-outlined notranslate"
                  >
                    download
                  </span>
                  Download {result.filename}
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setResult(null);
                  }}
                  className="mt-4 text-primary hover:underline text-sm font-bold"
                >
                  Process another file
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`border-3 border-dashed rounded-3xl p-12 transition-all ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : file
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {!file ? (
                    <div className="flex flex-col items-center pointer-events-none">
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[64px] text-gray-300 mb-4 notranslate"
                      >
                        upload_file
                      </span>
                      <h3 className="text-title-lg font-bold text-on-surface mb-2">
                        Drag & Drop your file here
                      </h3>
                      <p className="text-body-md text-on-surface-variant mb-6">
                        or click to browse from your computer
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[64px] text-green-500 mb-4 notranslate"
                      >
                        description
                      </span>
                      <h3 className="text-title-lg font-bold text-on-surface mb-2">
                        {file.name}
                      </h3>
                      <p className="text-body-md text-on-surface-variant mb-6">
                        Ready to process ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                        MB)
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png,.xls,.xlsx"
                  />
                  {!file && (
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl font-bold cursor-pointer transition-colors"
                    >
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[20px] notranslate"
                      >
                        folder_open
                      </span>
                      Choose File
                    </label>
                  )}
                </div>

                {file && (
                  <div className="mt-8 flex justify-center gap-4">
                    <button
                      onClick={() => setFile(null)}
                      className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Convert Now
                          <span
                            translate="no"
                            className="material-symbols-outlined text-[20px] notranslate"
                          >
                            arrow_forward
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          </div>
          

          
        <ToolInfo slug={toolSlug} toolName={toolName} />

          

          
      </main>
      <Footer />
    </div>
  );
}
