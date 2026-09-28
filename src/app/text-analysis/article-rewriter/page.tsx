"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ArticleRewriter() {
  const toolName = "Article Rewriter";
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("Standard");

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setOutputText("");

    try {
      const res = await fetch("/api/generic-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert article rewriter. Rewrite the following text using the "${mode}" mode. Ensure high quality, uniqueness, and perfect grammar.\n\nText: ${inputText}`,
        }),
      });
      const data = await res.json();
      if (data.result) {
        setOutputText(data.result);
      } else {
        setOutputText("An error occurred during rewriting.");
      }
    } catch (e) {
      setOutputText("Failed to process request.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-[32px] font-bold text-[#1A202C] mb-4">
              Free Article Rewriter Tool
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Rewrite sentences, paragraphs, and articles with our advanced AI-powered article spinner. Unique, readable, and SEO-friendly.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
            {/* Toolbar */}
            <div className="border-b border-gray-100 bg-[#FAFAFA] p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">Modes:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {["Standard", "Fluency", "Creative"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
                        mode === m
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="text-gray-500 hover:text-primary flex items-center gap-1 text-sm font-medium"
                  onClick={() => setInputText("")}
                >
                  <span translate="no" className="material-symbols-outlined text-[18px] notranslate">delete</span>
                  Clear
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Input Area */}
              <div className="flex flex-col h-full">
                <textarea
                  className="w-full h-[400px] p-6 resize-none focus:outline-none text-gray-700 text-[15px] leading-relaxed bg-transparent"
                  placeholder="Paste your text here to rewrite..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <div className="p-4 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    {inputText.trim().split(/\s+/).filter(w => w.length > 0).length} Words
                  </span>
                  <button
                    onClick={handleProcess}
                    disabled={isLoading || !inputText.trim()}
                    className="bg-[#005794] hover:bg-[#004270] text-white font-bold py-2.5 px-8 rounded-lg shadow-sm transition-all disabled:opacity-50"
                  >
                    {isLoading ? "Rewriting..." : "Rewrite Article"}
                  </button>
                </div>
              </div>

              {/* Output Area */}
              <div className="flex flex-col h-full bg-[#F8FAFC]">
                <div className="w-full h-[400px] p-6 overflow-y-auto whitespace-pre-wrap text-[15px] leading-relaxed text-gray-700">
                  {outputText || (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <span translate="no" className="material-symbols-outlined text-[48px] mb-3 opacity-50 notranslate">draw</span>
                      <p>Your rewritten article will appear here.</p>
                    </div>
                  )}
                </div>
                {outputText && (
                  <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
                      <span translate="no" className="material-symbols-outlined text-[18px] notranslate">check_circle</span>
                      Rewrite Successful
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2 px-6 rounded-lg shadow-sm transition-all flex items-center gap-2 text-sm"
                    >
                      <span translate="no" className="material-symbols-outlined text-[16px] notranslate">content_copy</span>
                      Copy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span translate="no" className="material-symbols-outlined text-[32px] text-primary notranslate">lightbulb</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">How to use Article Rewriter</h2>
                <p className="text-gray-500 mt-2 text-lg">Follow these simple steps to spin your text.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 mt-10">
              <div className="flex flex-col">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl font-black text-gray-400 mb-4 shadow-sm">1</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Input Text</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Paste your article or paragraph into the left input box.</p>
              </div>
              <div className="flex flex-col">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl font-black text-gray-400 mb-4 shadow-sm">2</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Select Mode</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Choose between Standard, Fluency, or Creative rewriting modes.</p>
              </div>
              <div className="flex flex-col">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl font-black text-primary mb-4 shadow-sm">3</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Rewrite &amp; Copy</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Click Rewrite Article and copy the unique, plagiarism-free result.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
