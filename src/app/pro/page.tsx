import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ProComingSoon() {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-4">
        <div className="max-w-2xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span translate="no" className="material-symbols-outlined text-[48px] text-primary notranslate">
              workspace_premium
            </span>
          </div>
          <h1 className="text-display-md font-display-md text-on-surface tracking-tight mb-4">
            Premium Features <br />
            <span className="text-primary">Coming Soon</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-12 max-w-xl mx-auto leading-relaxed">
            We are working hard to bring you advanced AI models, higher usage limits, API access, and much more. The Pro version will be available very soon. Stay tuned!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
          >
            <span translate="no" className="material-symbols-outlined text-[20px] notranslate">
              arrow_back
            </span>
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
