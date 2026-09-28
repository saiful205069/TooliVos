"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TextSummarizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summaryLength, setSummaryLength] = useState("Short");
  const [showBullets, setShowBullets] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setOutputText("");

    try {
      const formatInstruction = showBullets ? "Format the summary as a bulleted list." : "Format the summary as a cohesive paragraph.";
      const res = await fetch("/api/generic-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert text summarizer. Summarize the following text. Make the summary length: ${summaryLength}. ${formatInstruction}\n\nText: ${inputText}`,
        }),
      });
      const data = await res.json();
      if (data.result) {
        setOutputText(data.result);
      } else {
        setOutputText("An error occurred during summarization.");
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
              AI Text Summarizer
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Instantly summarize long articles, documents, and text into concise paragraphs or bullet points.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
            {/* Options Bar */}
            <div className="bg-[#1e293b] p-4 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Summary Length</label>
                  <div className="flex bg-[#0f172a] rounded-lg p-1">
                    {["Short", "Medium", "Long"].map((l) => (
                      <button
                        key={l}
                        onClick={() => setSummaryLength(l)}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
                          summaryLength === l
                            ? "bg-[#38bdf8] text-white shadow-sm"
                            : "text-gray-400 hover:text-gray-200"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Format</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowBullets(false)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                        !showBullets ? "bg-[#0f172a] text-[#38bdf8]" : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <span translate="no" className="material-symbols-outlined text-[18px] notranslate">segment</span> Paragraph
                    </button>
                    <button
                      onClick={() => setShowBullets(true)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                        showBullets ? "bg-[#0f172a] text-[#38bdf8]" : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <span translate="no" className="material-symbols-outlined text-[18px] notranslate">format_list_bulleted</span> Bullets
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleProcess}
                disabled={isLoading || !inputText.trim()}
                className="bg-[#38bdf8] hover:bg-[#0284c7] text-white font-bold py-2.5 px-8 rounded-lg shadow-md transition-all disabled:opacity-50"
              >
                {isLoading ? "Summarizing..." : "Summarize"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Input Area */}
              <div className="flex flex-col h-full bg-white">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">Original Text</h3>
                  <button className="text-gray-400 hover:text-red-500 text-sm font-medium flex items-center gap-1" onClick={() => setInputText("")}>
                    <span translate="no" className="material-symbols-outlined text-[16px] notranslate">delete</span> Clear
                  </button>
                </div>
                <textarea
                  className="w-full h-[350px] p-6 resize-none focus:outline-none text-gray-700 text-[15px] leading-relaxed"
                  placeholder="Paste your long text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <div className="p-3 bg-gray-50 border-t border-gray-100 text-right text-xs font-semibold text-gray-400">
                  {inputText.trim().split(/\s+/).filter(w => w.length > 0).length} Words
                </div>
              </div>

              {/* Output Area */}
              <div className="flex flex-col h-full bg-[#f8fafc]">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                  <h3 className="font-bold text-[#0f172a] flex items-center gap-2">
                    <span translate="no" className="material-symbols-outlined text-[#38bdf8] text-[20px] notranslate">bolt</span>
                    AI Summary
                  </h3>
                  {outputText && (
                    <button
                      onClick={copyToClipboard}
                      className="text-[#38bdf8] hover:text-[#0284c7] font-semibold text-sm flex items-center gap-1"
                    >
                      <span translate="no" className="material-symbols-outlined text-[16px] notranslate">content_copy</span> Copy
                    </button>
                  )}
                </div>
                <div className="w-full h-[350px] p-6 overflow-y-auto whitespace-pre-wrap text-[15px] leading-relaxed text-gray-800">
                  {outputText || (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <span translate="no" className="material-symbols-outlined text-[48px] mb-3 opacity-20 notranslate">summarize</span>
                      <p>Your summary will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
