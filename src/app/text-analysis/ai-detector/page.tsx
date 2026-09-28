"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AIDetector() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<{
    aiProbability: number;
    humanProbability: number;
    analysis: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDetect = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch("/api/ai-detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data);
      }
    } catch (error) {
      console.error("Detection failed:", error);
      setResult({
        aiProbability: 0,
        humanProbability: 0,
        analysis: "Error: Server connection failed.",
      });
    }
    setIsProcessing(false);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm shadow-sm mb-4">
              <span
                translate="no"
                className="material-symbols-outlined text-[16px] notranslate"
              >
                psychology
              </span>
              <span className="uppercase tracking-wider">AI 4.0 Model</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              AI Content Detector
            </h1>
            <p className="text-on-surface-variant">
              High-precision pattern detector identifying ChatGPT, Claude, and
              Gemini synthetic text. Analyze perplexity and burstiness to ensure
              originality.
            </p>
          </div>

          <div className="bg-surface-card rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              {/* Input Area (Takes up 3/5 width on Desktop) */}
              <div className="lg:col-span-3 flex flex-col h-[500px]">
                <div className="p-4 bg-surface-subtle border-b border-gray-100 flex items-center justify-between">
                  <span className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[18px] notranslate"
                    >
                      document_scanner
                    </span>
                    Scan Text
                  </span>
                  <button
                    onClick={() => setInputText("")}
                    className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <textarea
                  className="flex-1 w-full p-6 outline-none resize-none text-on-surface bg-transparent text-lg"
                  placeholder="Paste your text here to detect AI patterns..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>

                <div className="p-4 bg-surface/50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-text-muted font-bold">
                    {wordCount} / 2000 words
                  </span>
                  <button
                    onClick={handleDetect}
                    disabled={isProcessing || !inputText.trim()}
                    className="bg-secondary hover:bg-secondary-fixed disabled:opacity-50 text-on-secondary font-bold px-6 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <span
                          translate="no"
                          className="material-symbols-outlined animate-spin text-[18px] notranslate"
                        >
                          progress_activity
                        </span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <span
                          translate="no"
                          className="material-symbols-outlined text-[18px] notranslate"
                        >
                          radar
                        </span>
                        Detect AI Content
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Output / Results Area (Takes up 2/5 width) */}
              <div className="lg:col-span-2 flex flex-col h-auto lg:h-[500px] bg-surface-subtle/30 overflow-y-auto">
                <div className="p-6 h-full flex flex-col">
                  {isProcessing ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-secondary">
                      <span
                        translate="no"
                        className="material-symbols-outlined animate-spin text-5xl mb-4 notranslate"
                      >
                        analytics
                      </span>
                      <p className="font-bold text-lg animate-pulse">
                        Running Neural Analysis...
                      </p>
                      <p className="text-sm opacity-70 mt-2 text-center">
                        Checking semantic predictability and burstiness...
                      </p>
                    </div>
                  ) : result ? (
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2">
                        <span
                          translate="no"
                          className="material-symbols-outlined text-secondary notranslate"
                        >
                          troubleshoot
                        </span>
                        Detection Results
                      </h3>

                      {/* AI Score */}
                      <div className="mb-6 bg-surface p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-end mb-2 relative z-10">
                          <span className="font-bold text-accent-cyan text-lg">
                            AI Generated
                          </span>
                          <span className="font-black text-accent-cyan text-3xl">
                            {result.aiProbability}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 relative z-10 overflow-hidden">
                          <div
                            className="bg-accent-cyan h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${result.aiProbability}%` }}
                          ></div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                      </div>

                      {/* Human Score */}
                      <div className="mb-8 bg-surface p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-end mb-2 relative z-10">
                          <span className="font-bold text-green-500 text-lg">
                            Human Written
                          </span>
                          <span className="font-black text-green-500 text-3xl">
                            {result.humanProbability}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 relative z-10 overflow-hidden">
                          <div
                            className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${result.humanProbability}%` }}
                          ></div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                      </div>

                      {/* Analysis Summary */}
                      <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 flex-1">
                        <h4 className="font-bold mb-3 text-sm uppercase text-primary tracking-wider flex items-center gap-2">
                          <span
                            translate="no"
                            className="material-symbols-outlined text-[18px] notranslate"
                          >
                            insights
                          </span>
                          AI Analysis Details
                        </h4>
                        <p className="text-on-surface-variant leading-relaxed text-sm">
                          {result.analysis}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
                      <div className="w-20 h-20 bg-surface rounded-full shadow-sm flex items-center justify-center mb-4">
                        <span
                          translate="no"
                          className="material-symbols-outlined text-4xl opacity-50 notranslate"
                        >
                          policy
                        </span>
                      </div>
                      <p className="font-bold opacity-70">
                        Awaiting Text Input
                      </p>
                      <p className="text-sm opacity-50 text-center mt-2 max-w-xs">
                        Paste your content in the editor to identify traces of
                        artificial intelligence.
                      </p>
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
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-4">About AI Content Detector</h2>
          <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
            Ensure the authenticity of your content with our cutting-edge AI Content Detector. As AI writing models like ChatGPT, Claude, and Gemini become more prevalent, it is essential to verify if text is human-written or machine-generated. Our tool uses advanced linguistic pattern recognition to highlight potentially synthetic text, giving you peace of mind for academic integrity, SEO content quality, and editorial standards.
          </p>
          
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">How to Use This Tool</h3>
          <ol className="space-y-4">
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Paste the text you want to analyze into the input field.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Click the "Detect AI Content" button to initiate the scan.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Wait a moment while our neural network processes the linguistic patterns.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                4
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Review the results to see the probability of AI involvement and highlighted sentences.</p>
            </li>
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
