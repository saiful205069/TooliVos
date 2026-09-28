"use client";
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ParaphrasingTool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [tone, setTone] = useState("standard");
  const [lengthOption, setLengthOption] = useState("auto");
  const [wordLimit, setWordLimit] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleParaphrase = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setOutputText("");

    try {
      const response = await fetch("/api/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          tone,
          lengthOption,
          wordLimit: wordLimit ? parseInt(wordLimit) : null,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setOutputText(data.paraphrased);
      } else {
        setOutputText("Error: Could not paraphrase text.");
      }
    } catch (error) {
      setOutputText("Error: Server connection failed.");
    }
    setIsProcessing(false);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputText(event.target?.result as string);
        setIsUploading(false);
      };
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/parse-pdf", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.text) {
          setInputText(data.text);
        } else {
          alert("Failed to extract text from PDF.");
        }
      } catch (err) {
        alert("Error uploading PDF.");
      }
      setIsUploading(false);
    } else {
      alert("Unsupported file type. Please upload a .txt or .pdf file.");
      setIsUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const outWordCount = outputText.trim()
    ? outputText.trim().split(/\s+/).length
    : 0;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              AI Paraphrasing Tool
            </h1>
            <p className="text-on-surface-variant">
              Rewrite your articles, essays, and sentences effortlessly. Use our
              AI-powered paraphraser to improve fluency, change tone, adjust
              length, and avoid plagiarism.
            </p>
          </div>

          <div className="bg-surface-card rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            {/* Top Advanced Toolbar */}
            <div className="p-4 bg-surface border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
              {/* Length Options */}
              <div className="flex items-center gap-2 bg-surface-subtle p-1 rounded-xl">
                {[
                  { id: "auto", label: "Auto" },
                  { id: "shorten", label: "Shorten" },
                  { id: "expand", label: "Expand" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLengthOption(l.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                      lengthOption === l.id
                        ? "bg-surface shadow-sm text-primary"
                        : "text-text-muted hover:text-on-surface"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {/* Word Limit */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-bold text-on-surface-variant whitespace-nowrap">
                    Word Limit:
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 150"
                    value={wordLimit}
                    onChange={(e) => setWordLimit(e.target.value)}
                    className="w-24 bg-surface-subtle border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-on-surface-variant hover:text-primary hover:border-primary transition-colors disabled:opacity-50"
                >
                  <span
                    translate="no"
                    className="material-symbols-outlined text-[18px] notranslate"
                  >
                    {isUploading ? "hourglass_empty" : "upload_file"}
                  </span>
                  {isUploading ? "Extracting..." : "Upload TXT/PDF"}
                </button>
                <input
                  type="file"
                  accept=".txt,.pdf"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            {/* Mode Toolbar */}
            <div className="p-4 bg-surface-subtle border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <span className="text-sm font-bold text-on-surface-variant mr-2 whitespace-nowrap">
                  Modes:
                </span>
                {[
                  { id: "standard", label: "Standard", icon: "subject" },
                  { id: "fluency", label: "Fluency", icon: "water_drop" },
                  { id: "formal", label: "Formal", icon: "work" },
                  { id: "creative", label: "Creative", icon: "auto_awesome" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setTone(m.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                      tone === m.id
                        ? "bg-primary text-on-primary shadow-sm"
                        : "bg-surface hover:bg-pill-tag-bg text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[16px] notranslate"
                    >
                      {m.icon}
                    </span>
                    {m.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleParaphrase}
                disabled={isProcessing || !inputText.trim() || isUploading}
                className="bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-bold px-6 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
              >
                {isProcessing ? (
                  <>
                    <span
                      translate="no"
                      className="material-symbols-outlined animate-spin text-[18px] notranslate"
                    >
                      progress_activity
                    </span>
                    Rewriting...
                  </>
                ) : (
                  <>
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[18px] notranslate"
                    >
                      auto_fix
                    </span>
                    Paraphrase
                  </>
                )}
              </button>
            </div>

            {/* Split Editors */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Input Area */}
              <div className="flex flex-col h-[400px] md:h-[500px]">
                <textarea
                  className="flex-1 w-full p-6 outline-none resize-none text-on-surface bg-transparent text-lg"
                  placeholder="Paste your text here, or upload a document to rewrite..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <div className="p-4 bg-surface/50 border-t border-gray-100 flex items-center justify-between text-sm text-text-muted font-bold">
                  <span>{wordCount} words</span>
                  <button
                    onClick={() => setInputText("")}
                    className="hover:text-red-500 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Output Area */}
              <div className="flex flex-col h-[400px] md:h-[500px] bg-surface-subtle/30">
                <div className="flex-1 w-full p-6 overflow-y-auto">
                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center h-full text-primary">
                      <span
                        translate="no"
                        className="material-symbols-outlined animate-spin text-4xl mb-4 notranslate"
                      >
                        progress_activity
                      </span>
                      <p className="font-bold animate-pulse">
                        AI is rewriting your text...
                      </p>
                    </div>
                  ) : outputText ? (
                    <p className="text-lg text-on-surface whitespace-pre-wrap leading-relaxed">
                      {outputText}
                    </p>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-text-muted">
                      <span
                        translate="no"
                        className="material-symbols-outlined text-4xl mb-4 opacity-50 notranslate"
                      >
                        edit_note
                      </span>
                      <p className="font-bold opacity-50">
                        Your paraphrased text will appear here.
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-text-muted font-bold ml-2">
                    {outputText ? `${outWordCount} words` : ""}
                  </span>
                  <button
                    onClick={handleCopy}
                    disabled={!outputText || isProcessing}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-pill-tag-bg disabled:opacity-50 text-primary font-bold text-sm transition-colors shadow-sm border border-gray-100"
                  >
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[18px] notranslate"
                    >
                      {copied ? "check" : "content_copy"}
                    </span>
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      
      <section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-4">About Paraphrasing Tool</h2>
          <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
            Elevate your writing with our intelligent Paraphrasing Tool. Designed for students, bloggers, and professionals, this utility rephrases your sentences to improve clarity, tone, and uniqueness while preserving the original meaning. Bypass plagiarism checks naturally and overcome writer's block by discovering new ways to express your ideas with our AI-powered rewriting engine.
          </p>
          
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">How to Use This Tool</h3>
          <ol className="space-y-4">
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Enter the original text into the input canvas.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Select your desired tone (e.g., Standard, Fluency, Formal, Creative).</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Click "Paraphrase" and watch the AI instantly rewrite your content.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                4
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Copy the output and use the fresh, unique text in your project.</p>
            </li>
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
