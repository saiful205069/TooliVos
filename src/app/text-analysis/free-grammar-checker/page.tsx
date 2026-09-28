"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FreeGrammarChecker() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Suggestions");

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setOutputText("");

    try {
      const res = await fetch("/api/generic-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert grammar checker. Analyze the following text. First, provide the corrected text. Then, list the specific grammatical errors you found and why you fixed them.\n\nText: ${inputText}`,
        }),
      });
      const data = await res.json();
      if (data.result) {
        setOutputText(data.result);
      } else {
        setOutputText("An error occurred during grammar checking.");
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
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-[28px] font-bold text-[#1A202C] mb-2 flex items-center gap-2">
                <span translate="no" className="material-symbols-outlined text-primary text-[32px] notranslate">spellcheck</span>
                Free Grammar Checker
              </h1>
              <p className="text-gray-600 text-sm">
                Eliminate grammar errors, fix spelling mistakes, and improve your writing instantly.
              </p>
            </div>
            <button
              onClick={handleProcess}
              disabled={isLoading || !inputText.trim()}
              className="bg-[#005794] hover:bg-[#004270] text-white font-bold py-2.5 px-8 rounded-full shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <span translate="no" className="material-symbols-outlined animate-spin text-[20px] notranslate">progress_activity</span>
                  Checking...
                </>
              ) : (
                <>Check Grammar</>
              )}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Editor Area */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
              <div className="border-b border-gray-100 bg-[#FAFAFA] p-3 flex gap-2">
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded"><span translate="no" className="material-symbols-outlined text-[18px] notranslate">format_bold</span></button>
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded"><span translate="no" className="material-symbols-outlined text-[18px] notranslate">format_italic</span></button>
                <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded"><span translate="no" className="material-symbols-outlined text-[18px] notranslate">format_underlined</span></button>
                <div className="w-px bg-gray-300 mx-2"></div>
                <button
                  className="p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded flex items-center gap-1 text-xs font-semibold ml-auto"
                  onClick={() => setInputText("")}
                >
                  <span translate="no" className="material-symbols-outlined text-[16px] notranslate">delete</span> Clear
                </button>
              </div>
              <textarea
                className="w-full flex-1 p-8 resize-none focus:outline-none text-gray-800 text-[16px] leading-relaxed bg-transparent"
                placeholder="Type or paste your text here to check for grammar, spelling, and punctuation errors..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
              <div className="p-3 border-t border-gray-100 bg-[#FAFAFA] flex items-center justify-between text-xs font-semibold text-gray-500">
                <div className="flex gap-4">
                  <span>{inputText.trim().split(/\s+/).filter(w => w.length > 0).length} Words</span>
                  <span>{inputText.length} Characters</span>
                </div>
              </div>
            </div>

            {/* Sidebar / Output Area */}
            <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveTab("Suggestions")}
                  className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
                    activeTab === "Suggestions" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Suggestions &amp; Output
                </button>
                <button
                  onClick={() => setActiveTab("Score")}
                  className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
                    activeTab === "Score" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Overall Score
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto bg-[#F8FAFC]">
                {activeTab === "Suggestions" ? (
                  outputText ? (
                    <div className="whitespace-pre-wrap text-[14px] leading-relaxed text-gray-700 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      {outputText}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center px-4">
                      <img src="/logo.svg" alt="TooliVos" className="w-16 h-16 mb-4 opacity-20 grayscale" />
                      <h3 className="font-bold text-gray-500 mb-1">No text to check</h3>
                      <p className="text-sm">Enter some text on the left and click Check Grammar to see suggestions here.</p>
                    </div>
                  )
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center mb-4 relative">
                      <span className="text-3xl font-black text-gray-300">--</span>
                    </div>
                    <p className="text-gray-500 font-semibold">Run a check to see your score.</p>
                  </div>
                )}
              </div>

              {outputText && activeTab === "Suggestions" && (
                <div className="p-4 bg-white border-t border-gray-100">
                  <button
                    onClick={copyToClipboard}
                    className="w-full bg-[#EBF5FF] hover:bg-[#DBEAFE] text-[#1E40AF] font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <span translate="no" className="material-symbols-outlined text-[18px] notranslate">content_copy</span>
                    Copy Corrected Text
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
