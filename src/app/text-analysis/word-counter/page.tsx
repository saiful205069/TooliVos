"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersWithoutSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to analyze text", error);
    }
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setText("");
    setStats({
      words: 0,
      characters: 0,
      charactersWithoutSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0,
    });
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full pt-24 pb-16">
        <div className="max-w-[1000px] mx-auto px-margin md:px-margin-desktop">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Word Counter & Text Analyzer
            </h1>
            <p className="text-on-surface-variant">
              Analyze your text securely in the cloud. Count words, characters,
              sentences, and reading time.
            </p>
          </div>

          <div className="bg-surface-card rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-4 bg-surface-subtle border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                <span
                  translate="no"
                  className="material-symbols-outlined text-[18px] notranslate"
                >
                  edit_document
                </span>
                Input Text
              </span>
              <button
                onClick={handleClear}
                className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded transition"
              >
                Clear All
              </button>
            </div>

            <textarea
              className="w-full h-64 p-6 outline-none resize-y text-on-surface bg-transparent"
              placeholder="Paste or type your text here to analyze..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <div className="p-4 bg-surface-subtle border-t border-gray-100 flex items-center justify-end">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || text.trim() === ""}
                className="bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-bold px-6 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <span
                      translate="no"
                      className="material-symbols-outlined animate-spin text-[18px] notranslate"
                    >
                      progress_activity
                    </span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span
                      translate="no"
                      className="material-symbols-outlined text-[18px] notranslate"
                    >
                      analytics
                    </span>
                    Analyze Text
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-surface-card p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-bold text-primary mb-1">
                {stats.words}
              </div>
              <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Words
              </div>
            </div>
            <div className="bg-surface-card p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-bold text-secondary mb-1">
                {stats.characters}
              </div>
              <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Characters
              </div>
            </div>
            <div className="bg-surface-card p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-bold text-tertiary mb-1">
                {stats.charactersWithoutSpaces}
              </div>
              <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                No Spaces
              </div>
            </div>
            <div className="bg-surface-card p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-bold text-accent-cyan mb-1">
                {stats.sentences}
              </div>
              <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Sentences
              </div>
            </div>
            <div className="bg-surface-card p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-bold text-primary-container mb-1">
                {stats.paragraphs}
              </div>
              <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Paragraphs
              </div>
            </div>
            <div className="bg-surface-card p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-1">
                {stats.readingTime} <span className="text-lg">min</span>
              </div>
              <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Reading Time
              </div>
            </div>
          </div>
        </div>
      </main>

      
      <section className="max-w-[1240px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-4">About Word Counter & Analyzer</h2>
          <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
            Welcome to the most advanced online Word Counter & Analyzer. Whether you are writing an essay, preparing a blog post, or drafting an important email, knowing the exact word count and character limits is crucial. Our real-time text analysis tool provides instant feedback on words, characters, sentences, paragraphs, and estimated reading time. It operates entirely in your browser, ensuring complete privacy and lightning-fast performance.
          </p>
          
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-4">How to Use This Tool</h3>
          <ol className="space-y-4">
            
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Type or paste your text into the large input box above.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">The tool instantly analyzes your text as you type.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">View detailed metrics including word count, characters (with and without spaces), and reading time.</p>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                4
              </div>
              <p className="font-body-md text-on-surface-variant pt-1">Use the insights to optimize your content for SEO or strict character limits.</p>
            </li>
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
