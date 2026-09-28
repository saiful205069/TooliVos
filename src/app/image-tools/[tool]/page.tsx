"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolInfo from "@/components/ToolInfo";

export default function ImageGenericToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const resolvedParams = React.use(params);
  const toolSlug = resolvedParams.tool;

  const toolName = toolSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      setIsSuccess(false);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsSuccess(false);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);

    // Simulate processing time
    await new Promise((r) => setTimeout(r, 2000));

    setIsProcessing(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-display-sm font-display-sm tracking-tight text-on-surface mb-4">
              {toolName}
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Free online {toolName.toLowerCase()} tool. Fast, secure, and
              powered by AI.
            </p>
          </div>

          <div className="bg-surface-card rounded-3xl shadow-sm border border-gray-100 p-space-lg max-w-4xl mx-auto">
            {/* Go Pro Banner */}
            <div className="flex items-center justify-center gap-4 mb-8 bg-orange-50 py-3 px-6 rounded-xl border border-orange-200">
              <span className="bg-orange-500 text-white font-bold px-3 py-1 rounded text-sm flex items-center gap-1">
                <span
                  translate="no"
                  className="material-symbols-outlined text-[16px] notranslate"
                >
                  workspace_premium
                </span>
                Go Pro
              </span>
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <span
                  translate="no"
                  className="material-symbols-outlined text-[18px] text-orange-500 notranslate"
                >
                  photo_library
                </span>{" "}
                10 images per submission
              </span>
              <span className="text-sm font-medium text-gray-700 hidden md:flex items-center gap-1">
                <span
                  translate="no"
                  className="material-symbols-outlined text-[18px] text-orange-500 notranslate"
                >
                  block
                </span>{" "}
                Ad-Free
              </span>
              <button className="ml-auto bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold px-4 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-all text-sm">
                TRY NOW
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Zone */}
              <div className="flex flex-col h-full">
                <div
                  className={`h-[400px] border-3 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all ${
                    isDragging
                      ? "border-[#005794] bg-[#005794]/5"
                      : file
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200 hover:border-[#005794]/50 hover:bg-gray-50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {!file ? (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-[#005794]/10 rounded-full flex items-center justify-center mb-6">
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[40px] text-[#005794] notranslate"
                        >
                          image
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Drag and Drop {toolSlug.includes("video") ? "Video" : "Images"}
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 max-w-xs">
                        {toolSlug.includes("video") ? "Upload MP4, WebM up to 20MB." : "Upload PNG, JPG, WEBP, SVG up to 5 MB each."}
                      </p>

                      <div className="flex flex-col items-center gap-4">
                        <input
                          type="file"
                          id="image-upload"
                          className="hidden"
                          onChange={handleFileChange}
                          accept={toolSlug.includes("video") ? "video/*" : "image/*"}
                        />
                        <label
                          htmlFor="image-upload"
                          className="bg-[#005794] hover:bg-[#004270] text-white font-bold px-8 py-3 rounded-lg shadow-md cursor-pointer transition-colors flex items-center gap-2"
                        >
                          <span
                            translate="no"
                            className="material-symbols-outlined text-[20px] notranslate"
                          >
                            add_photo_alternate
                          </span>
                          Upload {toolSlug.includes("video") ? "Video" : "Images"}
                        </label>
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                          <hr className="w-8 border-gray-200" /> OR{" "}
                          <hr className="w-8 border-gray-200" />
                        </div>
                        <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl p-1 shadow-sm">
                          <button
                            className="p-2 hover:bg-gray-50 rounded-lg flex items-center justify-center"
                            title="Google Drive"
                          >
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg"
                              alt="Drive"
                              className="w-5 h-5 grayscale hover:grayscale-0 transition-all"
                            />
                          </button>
                          <div className="w-px h-5 bg-gray-200"></div>
                          <button
                            className="p-2 hover:bg-gray-50 rounded-lg flex items-center justify-center"
                            title="Dropbox"
                          >
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Dropbox_logo_2017.svg"
                              alt="Dropbox"
                              className="w-5 h-5 grayscale hover:grayscale-0 transition-all"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[40px] text-green-600 notranslate"
                        >
                          check_circle
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 break-all">
                        {file.name}
                      </h3>
                      <p className="text-green-600 text-sm mb-8 font-medium">
                        Ready for {toolName}
                      </p>
                      <button
                        onClick={() => {
                          setFile(null);
                          setIsSuccess(false);
                        }}
                        className="text-gray-500 hover:text-red-500 font-medium underline"
                      >
                        Remove file
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleProcess}
                  disabled={isProcessing || !file}
                  className="mt-6 w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : `Run ${toolName}`}
                </button>
              </div>

              {/* Result Zone */}
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-title-md text-title-md text-on-surface">
                    Result
                  </h3>
                </div>
                <div
                  className={`w-full h-[400px] p-space-md rounded-2xl flex flex-col items-center justify-center text-center ${
                    isSuccess
                      ? "bg-[#005794]/5 border border-[#005794]/20"
                      : "bg-surface-subtle border border-gray-200 text-gray-400"
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <span
                        translate="no"
                        className="material-symbols-outlined text-[64px] text-green-500 mb-4 notranslate"
                      >
                        task_alt
                      </span>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        Success!
                      </h4>
                      <p className="text-gray-600 mb-6">
                        Your image has been processed successfully.
                      </p>
                      <button className="bg-[#005794] hover:bg-[#004270] text-white font-bold px-8 py-3 rounded-lg shadow-md transition-colors flex items-center gap-2">
                        Download Result
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[20px] notranslate"
                        >
                          download
                        </span>
                      </button>
                    </>
                  ) : (
                    "Your processed result will appear here..."
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section (Detailed) */}
          <div className="max-w-4xl mx-auto mt-16 mb-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span
                  translate="no"
                  className="material-symbols-outlined text-[32px] text-primary notranslate"
                >
                  lightbulb
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  How to properly use this tool
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                  Follow these comprehensive instructions to get the most
                  accurate results.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10 mt-10 relative before:absolute before:hidden md:before:block before:top-[30px] before:left-[10%] before:right-[10%] before:h-0.5 before:bg-gray-100 before:-z-10">
              <div className="flex flex-col bg-white">
                <div className="w-16 h-16 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center text-2xl font-black text-gray-300 mb-6 shadow-sm">
                  01
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Provide your input
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  Drag and drop your file directly into the designated upload
                  zone, or click the browse button to select a file from your
                  device storage. We support high-quality uploads up to 5MB to
                  ensure your media remains crisp and intact.
                </p>
              </div>

              <div className="flex flex-col bg-white">
                <div className="w-16 h-16 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center text-2xl font-black text-gray-300 mb-6 shadow-sm">
                  02
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Initiate Processing
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  After the file is successfully uploaded, click the blue
                  processing button. Our cloud servers will instantly convert,
                  compress, or analyze your media file using lossless
                  algorithms, ensuring maximum quality retention.
                </p>
              </div>

              <div className="flex flex-col bg-white">
                <div className="w-16 h-16 bg-white border-4 border-primary/20 rounded-full flex items-center justify-center text-2xl font-black text-primary mb-6 shadow-sm">
                  03
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Review &amp; Download
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  Once the analysis is complete, your highly accurate results
                  will be displayed instantly on the screen. You can review the
                  details, copy the text to your clipboard with one click, or
                  securely download the generated report to your local device
                  for future reference.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 bg-blue-50/50 -mx-8 -mb-8 px-8 py-6 rounded-b-2xl flex gap-4 items-start">
              <span
                translate="no"
                className="material-symbols-outlined text-[24px] text-blue-600 mt-1 notranslate"
              >
                shield_lock
              </span>
              <div>
                <h4 className="font-bold text-blue-900 mb-1">
                  100% Secure &amp; Private
                </h4>
                <p className="text-blue-700/80 text-sm leading-relaxed">
                  We take your privacy very seriously. All processed data,
                  texts, images, and files are encrypted during transit and are{" "}
                  <strong>permanently deleted</strong> from our servers
                  immediately after your session ends. We do not store, share,
                  or use your data to train our AI models.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ToolInfo slug={toolSlug} toolName={toolName} />

      </main>
      <Footer />
    </div>
  );
}
