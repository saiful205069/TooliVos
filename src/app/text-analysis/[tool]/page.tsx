"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolInfo from "@/components/ToolInfo";
import Link from "next/link";

export default function GenericToolPage({
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

  const isImageInputTool = [
    "image-to-text-converter",
    "jpg-to-word",
    "ocr",
  ].includes(toolSlug);
  const isAudioInputTool = ["speech-to-text"].includes(toolSlug);
  const isPlagiarism = toolSlug === "plagiarism-checker";

  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleProcess = async () => {
    if (!isImageInputTool && !isAudioInputTool && !inputText.trim()) return;
    if ((isImageInputTool || isAudioInputTool) && !file) return;

    setIsLoading(true);
    setOutputText("");

    try {
      let reqBody: any = { toolSlug, toolName };

      if (isImageInputTool || isAudioInputTool) {
        if (file) {
          reqBody.fileMimeType = file.type;
          reqBody.fileBase64 = await toBase64(file);
          reqBody.text = "Please extract the text from this file.";
        }
      } else {
        reqBody.text = inputText;
      }

      const res = await fetch("/api/generic-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOutputText(data.result);
    } catch (error) {
      console.error(error);
      setOutputText("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    alert("Copied to clipboard!");
  };

  if (isPlagiarism) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
        <Header />
        <main className="flex-1 pt-24 pb-16 px-4 md:px-8">
          <div className="max-w-[1000px] mx-auto">
            <h1 className="text-[28px] font-bold text-[#1A202C] mb-6">
              Plagiarism Checker
            </h1>

            {/* Main Plagiarism Box */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              {/* Green Header */}
              <div className="bg-[#128C4A] px-4 py-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-white font-extrabold text-xl tracking-wide">
                    30% OFF
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      "No Words Limit",
                      "Plagiarism API",
                      "User Seats",
                      "No Ads",
                      "Accurate Result",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="bg-white text-[#128C4A] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"
                      >
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[14px] notranslate"
                        >
                          check_circle
                        </span>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                  Starting from $9.80
                </button>
              </div>

              {/* Textarea */}
              <div className="p-4 flex-1 flex flex-col">
                <textarea
                  className="w-full min-h-[300px] resize-none focus:outline-none text-gray-700 text-[15px]"
                  placeholder="Start typing or paste (Ctrl + V) your content here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>
              </div>

              {/* Bottom Toolbar */}
              <div className="border-t border-gray-100 px-4 py-3 flex flex-wrap items-center justify-between gap-4 bg-[#FAFAFA]">
                <div className="flex items-center gap-4">
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 bg-white focus:outline-none">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                  <button className="text-gray-500 hover:text-gray-800">
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[20px] notranslate"
                    >
                      cloud_upload
                    </span>
                  </button>
                  <button className="text-[#0061FE] hover:text-blue-800 flex items-center">
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[20px] notranslate"
                    >
                      folder
                    </span>
                  </button>
                  <span className="text-xs font-semibold text-gray-600">
                    {
                      inputText
                        .trim()
                        .split(/\s+/)
                        .filter((w) => w.length > 0).length
                    }
                    /1000 Words
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#FFF8E1] text-[#F57F17] font-bold text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    4.6/5{" "}
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[14px] notranslate"
                    >
                      star
                    </span>
                  </div>
                  <button className="border border-gray-300 bg-white text-gray-700 text-sm font-semibold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-50">
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[16px] notranslate"
                    >
                      link
                    </span>
                    Check by URL
                  </button>
                  <button
                    onClick={() => setInputText("")}
                    className="bg-[#FFEBEB] text-[#D32F2F] p-1.5 rounded hover:bg-red-100"
                  >
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[18px] notranslate"
                    >
                      ink_eraser
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* reCAPTCHA Mock */}
            <div className="flex justify-center mt-6">
              <div className="bg-white border border-gray-200 rounded shadow-sm px-4 py-2 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-[24px] text-[#128C4A] notranslate"
                  >
                    check_circle
                  </span>
                  <span className="text-sm text-gray-700">Success!</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-gray-500">
                    CLOUDFLARE
                  </span>
                  <div className="flex gap-1 text-[8px] text-gray-400">
                    <span>Privacy</span>•<span>Terms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <button
                onClick={handleProcess}
                disabled={isLoading || !inputText.trim()}
                className="bg-[#0D47A1] hover:bg-blue-900 text-white font-bold py-2.5 px-6 rounded shadow-sm disabled:opacity-50"
              >
                {isLoading ? "Checking..." : "Check Plagiarism"}
              </button>
              <button className="bg-[#FF9800] hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded shadow-sm">
                Deep Plagiarism Checker
              </button>
              <Link href="/text-analysis/free-grammar-checker">
                <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold py-2.5 px-6 rounded shadow-sm">
                  Check Grammar
                </button>
              </Link>
              <Link href="/text-analysis/ai-detector">
                <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold py-2.5 px-6 rounded shadow-sm">
                  Detect AI Content
                </button>
              </Link>
            </div>

            {/* Output Result Area */}
            {outputText && (
              <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-800">
                    Plagiarism Report
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[16px] notranslate"
                    >
                      content_copy
                    </span>{" "}
                    Copy
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                  {outputText}
                </div>
              </div>
            )}
          </div>

          
            <ToolInfo slug={toolSlug} toolName={toolName} />


          
          </main>
        <Footer />
      </div>
    );
  }

  // DEFAULT UI FOR OTHER TOOLS
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
              Free online {toolName.toLowerCase()} powered by AI. Get accurate
              and instant results.
            </p>
          </div>

          <div className="bg-surface-card rounded-3xl shadow-sm border border-gray-100 p-space-lg">
            {isImageInputTool || isAudioInputTool ? (
              // IMAGE/AUDIO UPLOAD UI
              <div className="max-w-4xl mx-auto">
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
                    10 {isImageInputTool ? "images" : "files"} per submission
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
                      className={`h-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : file
                            ? "border-green-400 bg-green-50"
                            : "border-gray-300 hover:bg-gray-50"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {!file ? (
                        <>
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <span
                              translate="no"
                              className="material-symbols-outlined text-[40px] text-gray-500 notranslate"
                            >
                              {isImageInputTool ? "image" : "audio_file"}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Drag and Drop{" "}
                            {isImageInputTool ? "Images" : "Audio"}
                          </h3>
                          <p className="text-gray-500 text-sm mb-8 text-center max-w-xs">
                            Upload{" "}
                            {isImageInputTool ? "PNG, JPG, WEBP" : "MP3, WAV"}{" "}
                            up to 5 MB each.
                          </p>
                          <input
                            type="file"
                            id="media-upload"
                            className="hidden"
                            onChange={handleFileChange}
                            accept={isImageInputTool ? "image/*" : "audio/*"}
                          />
                          <label
                            htmlFor="media-upload"
                            className="bg-[#F4B400] hover:bg-[#E0A800] text-white font-bold px-8 py-3 rounded-lg shadow-md cursor-pointer transition-colors flex items-center gap-2"
                          >
                            Upload {isImageInputTool ? "Images" : "File"}
                            <span
                              translate="no"
                              className="material-symbols-outlined text-[20px] notranslate"
                            >
                              expand_more
                            </span>
                          </label>
                        </>
                      ) : (
                        <>
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <span
                              translate="no"
                              className="material-symbols-outlined text-[40px] text-green-600 notranslate"
                            >
                              check_circle
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center break-all">
                            {file.name}
                          </h3>
                          <p className="text-green-600 text-sm mb-8 font-medium">
                            Ready to extract
                          </p>
                          <button
                            onClick={() => setFile(null)}
                            className="text-gray-500 hover:text-red-500 font-medium underline"
                          >
                            Remove file
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      onClick={handleProcess}
                      disabled={isLoading || !file}
                      className="mt-6 w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Extracting Text..." : "Convert To Text"}
                    </button>
                  </div>

                  {/* Output Zone */}
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-title-md text-title-md text-on-surface">
                        Extracted Text
                      </h3>
                      {outputText && (
                        <button
                          onClick={copyToClipboard}
                          className="text-primary hover:text-primary-container font-label-sm flex items-center gap-1"
                        >
                          <span
                            translate="no"
                            className="material-symbols-outlined text-[16px] notranslate"
                          >
                            content_copy
                          </span>
                          Copy
                        </button>
                      )}
                    </div>
                    <div
                      className={`w-full h-[400px] p-space-md rounded-2xl overflow-y-auto whitespace-pre-wrap text-body-md ${
                        outputText
                          ? "bg-primary/5 border border-primary/20 text-on-surface"
                          : "bg-surface-subtle border border-gray-200 text-gray-400 flex items-center justify-center"
                      }`}
                    >
                      {outputText ||
                        "Your extracted result will appear here..."}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // TEXT TO TEXT UI (Existing)
              <div className="grid lg:grid-cols-2 gap-space-lg">
                {/* Input Section */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-space-sm">
                    <h3 className="font-title-md text-title-md text-on-surface">
                      Input Text
                    </h3>
                    <span className="text-body-sm text-on-surface-variant">
                      {
                        inputText
                          .trim()
                          .split(/\s+/)
                          .filter((w) => w.length > 0).length
                      }{" "}
                      words
                    </span>
                  </div>
                  <textarea
                    className="w-full h-[400px] p-space-md bg-surface-subtle border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md text-on-surface transition-all"
                    placeholder="Type or paste your text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  ></textarea>
                  <button
                    onClick={handleProcess}
                    disabled={isLoading || !inputText.trim()}
                    className="mt-space-md w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg py-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Run {toolName}
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[20px] notranslate"
                        >
                          auto_awesome
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Output Section */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-space-sm">
                    <h3 className="font-title-md text-title-md text-on-surface">
                      Result
                    </h3>
                    {outputText && (
                      <button
                        onClick={copyToClipboard}
                        className="text-primary hover:text-primary-container font-label-sm flex items-center gap-1"
                      >
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[16px] notranslate"
                        >
                          content_copy
                        </span>
                        Copy
                      </button>
                    )}
                  </div>
                  <div
                    className={`w-full h-[400px] p-space-md rounded-2xl overflow-y-auto whitespace-pre-wrap text-body-md ${
                      outputText
                        ? "bg-primary/5 border border-primary/20 text-on-surface"
                        : "bg-surface-subtle border border-gray-200 text-gray-400 flex items-center justify-center"
                    }`}
                  >
                    {outputText || "Your result will appear here..."}
                  </div>
                </div>
              </div>
            )}
          </div>

          
          </div>
          
                  <ToolInfo slug={toolSlug} toolName={toolName} />

          
                </main>
      <Footer />
    </div>
  );
}
