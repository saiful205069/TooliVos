"use client";
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PdfToWordConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/pdf-to-word", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Conversion failed.");
      }

      // Handle file download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedFile.name.replace(".pdf", "") + "_Converted_AI.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // Success feedback
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Successfully converted to DOCX!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during conversion.",
      );
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-tertiary/10 text-tertiary mb-4">
              <span
                translate="no"
                className="material-symbols-outlined text-3xl notranslate"
              >
                document_scanner
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              AI PDF to Word Converter
            </h1>
            <p className="text-on-surface-variant text-lg">
              Convert your messy PDF documents into perfectly formatted,
              editable Word (.docx) files using Gemini AI.
            </p>
          </div>

          <div className="bg-surface-card rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-2xl mx-auto text-center">
            {!selectedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-tertiary bg-surface-subtle hover:bg-tertiary/5 rounded-3xl p-12 cursor-pointer transition-all flex flex-col items-center justify-center group"
              >
                <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-5xl text-tertiary notranslate"
                  >
                    upload_file
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Upload your PDF</h3>
                <p className="text-text-muted">
                  Drag & drop your file here, or click to browse
                </p>
              </div>
            ) : (
              <div className="border-2 border-solid border-tertiary bg-tertiary/5 rounded-3xl p-8 flex flex-col items-center justify-center">
                <span
                  translate="no"
                  className="material-symbols-outlined text-5xl text-tertiary mb-4 notranslate"
                >
                  picture_as_pdf
                </span>
                <h3 className="text-xl font-bold text-on-surface mb-1">
                  {selectedFile.name}
                </h3>
                <p className="text-text-muted mb-8">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedFile(null)}
                    disabled={isProcessing}
                    className="px-6 py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConvert}
                    disabled={isProcessing}
                    className="bg-tertiary hover:bg-tertiary-container text-white font-bold px-8 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <span
                          translate="no"
                          className="material-symbols-outlined animate-spin notranslate"
                        >
                          progress_activity
                        </span>{" "}
                        Processing with AI...
                      </>
                    ) : (
                      <>
                        <span
                          translate="no"
                          className="material-symbols-outlined notranslate"
                        >
                          auto_fix
                        </span>{" "}
                        Convert to DOCX
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center gap-2 justify-center">
                <span
                  translate="no"
                  className="material-symbols-outlined notranslate"
                >
                  error
                </span>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      
      <section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-4">About PDF to Word Converter</h2>
          <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
            Transform your PDF documents into fully editable Microsoft Word (.docx) files in seconds. Our PDF to Word Converter accurately extracts text, formatting, and images, saving you hours of manual retyping. Ideal for editing contracts, updating resumes, or reusing report templates. All processing is secure, and your files are never permanently stored on our servers.
          </p>
          
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">How to Use This Tool</h3>
          <ol className="space-y-4">
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Click "Upload PDF" or drag and drop your file into the designated area.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Our engine will automatically process and convert the document formatting.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Wait for the conversion progress bar to reach 100%.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                4
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Download your new .docx file, ready to be edited in MS Word or Google Docs.</p>
            </li>
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
