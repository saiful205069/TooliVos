"use client";
import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, openLoginModal, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-card/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-[1440px] mx-auto px-margin-desktop flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-lg">
            <a
              className="flex items-center gap-space-sm"
              data-path="all-tools"
              href="/"
            >
              <img
                alt="Brand logo"
                className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105"
                src="/logo.svg"
              />
              <span className="text-[26px] md:text-[30px] font-black tracking-tight ml-2 font-sans flex items-center">
                <span className="text-[#0F172A]">Tooli</span>
                <span className="text-primary">Vos</span>
              </span>
            </a>
            <nav className="hidden xl:flex items-center gap-space-xs">
              <a
                aria-current="page"
                className="px-space-md py-space-sm bg-pill-tag-bg text-primary font-label-md rounded-xl shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-300"
                href="/"
              >
                All Tools
              </a>
              <a
                className="px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-[#F8FAFC] hover:shadow-sm hover:-translate-y-[1px] rounded-xl transition-all duration-300"
                href="/text-analysis"
              >
                Text Analysis
              </a>
              <a
                className="px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-[#F8FAFC] hover:shadow-sm hover:-translate-y-[1px] rounded-xl transition-all duration-300"
                href="/seo-backlinks"
              >
                SEO &amp; Backlinks
              </a>
              <a
                className="px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-[#F8FAFC] hover:shadow-sm hover:-translate-y-[1px] rounded-xl transition-all duration-300"
                href="/images-pdf"
              >
                Images &amp; PDF
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-space-md">
            <LanguageSwitcher />

            {!user ? (
              <button
                onClick={openLoginModal}
                className="hidden md:inline-block font-label-lg text-label-lg text-on-surface-variant hover:text-primary px-space-sm py-space-xs transition-colors"
              >
                Log in
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-1 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    <span translate="no" className="material-symbols-outlined  text-[18px] notranslate"
                    >
                      person
                    </span>
                  </div>
                  <span className="hidden md:block font-bold text-sm max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <span translate="no" className="hidden md:block material-symbols-outlined  text-[16px] notranslate"
                  >
                    expand_more
                  </span>
                </button>
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-[60]">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold truncate">{user.email}</p>
                    </div>
                    <a
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                    >
                      <span translate="no" className="material-symbols-outlined text-[18px]  notranslate"
                      >
                        person
                      </span>{" "}
                      My Profile
                    </a>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 text-sm text-left"
                    >
                      <span translate="no" className="material-symbols-outlined text-[18px]  notranslate"
                      >
                        logout
                      </span>{" "}
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}

            <a
              className="hidden md:flex bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-space-lg py-space-sm rounded-[9999px] transition-colors shadow-sm items-center gap-space-xs"
              href="/pro"
            >
              <span>Go Pro</span>
              <span translate="no" className="material-symbols-outlined text-[16px]  notranslate"
              >
                bolt
              </span>
            </a>

            <button
              className="xl:hidden flex items-center justify-center text-on-surface ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span translate="no" className="material-symbols-outlined text-[24px]  notranslate"
              >
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>
      \n <LoginModal />
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-surface flex flex-col pt-20 px-6 xl:hidden overflow-y-auto">
          <nav className="flex flex-col gap-4 text-lg font-bold mb-8">
            <a href="/" className="text-primary border-b border-gray-100 pb-2">
              All Tools
            </a>
            <a
              href="/text-analysis"
              className="text-on-surface-variant hover:text-primary border-b border-gray-100 pb-2"
            >
              Text Analysis
            </a>
            <a
              href="/seo-backlinks"
              className="text-on-surface-variant hover:text-primary border-b border-gray-100 pb-2"
            >
              SEO & Backlinks
            </a>
            <a
              href="/images-pdf"
              className="text-on-surface-variant hover:text-primary border-b border-gray-100 pb-2"
            >
              Images & PDF
            </a>
          </nav>
          <div className="flex flex-col gap-4">
            {!user ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="text-center font-bold py-3 bg-surface-subtle rounded-xl text-on-surface w-full"
              >
                Log In
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <a
                  href="/profile"
                  className="text-center font-bold py-3 bg-surface-subtle rounded-xl text-primary w-full flex items-center justify-center gap-2"
                >
                  <span translate="no" className="material-symbols-outlined text-[18px]  notranslate"
                  >
                    person
                  </span>{" "}
                  {user.name}'s Profile
                </a>
                <button
                  onClick={logout}
                  className="text-center font-bold py-3 bg-red-50 rounded-xl text-red-600 w-full flex items-center justify-center gap-2"
                >
                  <span translate="no" className="material-symbols-outlined text-[18px]  notranslate"
                  >
                    logout
                  </span>{" "}
                  Log out
                </button>
              </div>
            )}

            <a
              href="#"
              className="text-center font-bold py-3 bg-primary text-on-primary rounded-xl flex items-center justify-center gap-2"
            >
              Go Pro{" "}
              <span translate="no" className="material-symbols-outlined text-[18px]  notranslate"
              >
                bolt
              </span>
            </a>
          </div>
        </div>
      )}
      <LoginModal />
    </>
  );
}
