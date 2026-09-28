"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center font-sans text-center px-4">
        <Header />
        <span
          translate="no"
          className="material-symbols-outlined text-6xl text-gray-300 mb-4 notranslate"
        >
          lock
        </span>
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">
          You must be logged in to view this page.
        </p>
        <a
          href="/"
          className="bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-sm hover:bg-primary-container transition-colors"
        >
          Return to Home
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full pt-24 pb-16">
        <div className="max-w-[1000px] mx-auto px-margin md:px-margin-desktop">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Sidebar Profile Card */}
            <div className="w-full md:w-1/3 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white font-bold text-4xl mb-4 shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <p className="text-gray-500 mb-4">{user.email}</p>

              <div className="w-full h-px bg-gray-100 my-4"></div>

              <div className="w-full flex justify-between items-center text-sm mb-2">
                <span className="text-gray-500">Member Since</span>
                <span className="font-bold">{user.joinDate}</span>
              </div>
              <div className="w-full flex justify-between items-center text-sm mb-6">
                <span className="text-gray-500">Plan Status</span>
                {user.isPro ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 font-bold rounded text-xs uppercase">
                    Pro
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 font-bold rounded text-xs uppercase">
                    Free
                  </span>
                )}
              </div>

              {!user.isPro && (
                <button className="w-full bg-primary-container hover:bg-primary text-on-primary font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  Upgrade to Pro{" "}
                  <span
                    translate="no"
                    className="material-symbols-outlined text-[18px] notranslate"
                  >
                    bolt
                  </span>
                </button>
              )}
            </div>

            {/* Main Content Area */}
            <div className="w-full md:w-2/3 space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-primary notranslate"
                  >
                    history
                  </span>
                  Recent Activity
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <span
                        translate="no"
                        className="material-symbols-outlined notranslate"
                      >
                        psychology
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">
                        Used AI Content Detector
                      </p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                      <span
                        translate="no"
                        className="material-symbols-outlined notranslate"
                      >
                        document_scanner
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Converted PDF to DOCX</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span
                    translate="no"
                    className="material-symbols-outlined text-primary notranslate"
                  >
                    settings
                  </span>
                  Account Settings
                </h3>
                <p className="text-sm text-gray-500">
                  Settings panel is coming soon. You will be able to change your
                  password, update preferences, and manage your subscription
                  here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
