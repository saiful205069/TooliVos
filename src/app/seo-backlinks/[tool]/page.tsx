"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolInfo from "@/components/ToolInfo";

export default function SeoTool({ params }: { params: Promise<{ tool: string }> }) {
  const resolvedParams = React.use(params);
  const toolSlug = resolvedParams.tool;
  const toolName = toolSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [inputUrl, setInputUrl] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [seoData, setSeoData] = useState<any>(null);

  const handleProcess = async () => {
    if (!inputUrl.trim()) return;
    setIsLoading(true);
    setOutputText("");
    setSeoData(null);

    try {
      const res = await fetch("/api/generic-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputUrl,
          toolSlug,
          toolName,
        }),
      });
      const data = await res.json();
      
      let rawResult = data.result || "";
      // Strip markdown json formatting if Gemini included it
      if (rawResult.startsWith("```json")) {
        rawResult = rawResult.replace(/```json/g, "").replace(/```/g, "").trim();
      } else if (rawResult.startsWith("```")) {
        rawResult = rawResult.replace(/```/g, "").trim();
      }

      try {
        const parsed = JSON.parse(rawResult);
        setSeoData(parsed);
      } catch (e) {
        setOutputText(data.result || "An error occurred during analysis.");
      }
    } catch (e) {
      setOutputText("Failed to process request.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    const textToCopy = seoData ? JSON.stringify(seoData, null, 2) : outputText;
    navigator.clipboard.writeText(textToCopy);
    alert("Report copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-[32px] font-bold text-[#1A202C] mb-4">
              {toolName}
            </h1>
            <p className="text-gray-600 text-lg">
              Free advanced {toolName.toLowerCase()} to check website health, backlinks, and performance.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 max-w-4xl mx-auto mb-12">
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-2 flex flex-col md:flex-row md:items-center shadow-sm focus-within:border-[#005794] focus-within:ring-4 focus-within:ring-[#005794]/10 transition-all">
                <div className="flex items-center flex-1 px-4">
                  <span translate="no" className="material-symbols-outlined text-gray-400 mr-3 notranslate">link</span>
                  <input
                    type="url"
                    className="w-full bg-transparent border-none outline-none text-gray-700 py-3 text-lg placeholder-gray-400"
                    placeholder="Enter domain or URL (e.g., https://example.com)"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleProcess()}
                  />
                </div>
                <button
                  onClick={handleProcess}
                  disabled={isLoading || !inputUrl.trim()}
                  className="bg-[#005794] hover:bg-[#004270] text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap mt-2 md:mt-0"
                >
                  {isLoading ? "Analyzing..." : `Check ${toolName}`}
                </button>
              </div>
              
              {/* Fake CAPTCHA for visual authenticity */}
              <div className="flex justify-center mt-2">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3 flex items-center gap-8 w-fit">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 accent-[#005794] cursor-pointer" defaultChecked />
                    <span className="text-sm font-medium text-gray-700">I am human</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                      <span translate="no" className="material-symbols-outlined text-[12px] notranslate">shield</span>
                      SECURITY
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Section */}
            {(seoData || outputText) && (
              <div className="mt-12 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-0 bg-white p-4 border-b border-gray-100 rounded-t-2xl shadow-sm z-10 relative">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <span translate="no" className="material-symbols-outlined text-green-500 notranslate">task_alt</span>
                    Analysis Report for {inputUrl.replace(/^https?:\/\//, '')}
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className="text-[#005794] hover:bg-[#005794]/10 font-bold text-sm flex items-center gap-1 bg-[#005794]/5 px-4 py-2 rounded-lg transition-all"
                  >
                    <span translate="no" className="material-symbols-outlined text-[16px] notranslate">file_download</span>
                    Export
                  </button>
                </div>
                
                <div className="bg-[#f8fafc] p-6 md:p-8 rounded-b-2xl border border-gray-100 border-t-0 shadow-sm relative -mt-1">
                  {seoData ? (
                    <div className="flex flex-col gap-8">
                      {/* Top Summary & Score */}
                      <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-gray-100"
                              strokeWidth="3"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className={`${seoData.score >= 80 ? 'text-green-500' : seoData.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
                              strokeDasharray={`${seoData.score}, 100`}
                              strokeWidth="3"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-gray-800">{seoData.score}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Score</span>
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-xl font-bold text-gray-800 mb-2">Overall Performance</h4>
                          <p className="text-gray-600 leading-relaxed text-sm">{seoData.summary}</p>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      {seoData.metrics && seoData.metrics.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {seoData.metrics.map((metric: any, idx: number) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{metric.label}</span>
                              <span className={`text-2xl font-black ${metric.status === 'good' ? 'text-green-600' : metric.status === 'warning' ? 'text-yellow-600' : metric.status === 'error' ? 'text-red-600' : 'text-[#005794]'}`}>
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Data Table */}
                      {seoData.tableData && seoData.tableData.length > 0 && (
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                              <thead className="bg-[#FAFAFA] border-b border-gray-100 text-xs uppercase font-bold text-gray-500">
                                <tr>
                                  {Object.keys(seoData.tableData[0]).map((key) => (
                                    <th key={key} className="px-6 py-4">{key}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {seoData.tableData.map((row: any, i: number) => (
                                  <tr key={i} className="hover:bg-gray-50">
                                    {Object.values(row).map((val: any, j: number) => (
                                      <td key={j} className="px-6 py-4 font-medium">{val}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-[15px] text-gray-700 leading-relaxed">
                      {outputText}
                    </div>
                  )}
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
