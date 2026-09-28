"use client";
import React, { useState, useEffect, useRef } from "react";

const languages = [
  { code: "en", name: "English", flag: "us" },
  { code: "bn", name: "Bengali", flag: "bd" },
  { code: "es", name: "Spanish", flag: "es" },
  { code: "fr", name: "French", flag: "fr" },
  { code: "ar", name: "Arabic", flag: "sa" },
  { code: "hi", name: "Hindi", flag: "in" },
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if googtrans cookie exists
    const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
    if (match) {
      const parts = match[1].split("/"); // e.g., /en/bn
      if (parts.length > 2) {
        const lang = languages.find((l) => l.code === parts[2]);
        if (lang) setCurrentLang(lang);
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang: (typeof languages)[0]) => {
    setCurrentLang(lang);
    setIsOpen(false);

    // Set Google Translate cookie
    if (lang.code === "en") {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${lang.code}; path=/;`;
    }
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex items-center gap-space-xs px-space-sm py-space-xs rounded-xl bg-surface-subtle text-on-surface-variant cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <img
          src={`https://flagcdn.com/w20/${currentLang.flag}.png`}
          alt={currentLang.name}
          className="w-5 h-auto rounded-[2px]"
        />
        <span className="font-label-md text-label-md font-bold uppercase">
          {currentLang.code}
        </span>
        <span
          translate="no"
          className="material-symbols-outlined text-[16px] notranslate"
        >
          expand_more
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-[60]">
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => changeLanguage(lang)}
              className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer ${currentLang.code === lang.code ? "bg-primary/5 text-primary font-bold" : "text-gray-700"}`}
            >
              <img
                src={`https://flagcdn.com/w20/${lang.flag}.png`}
                alt={lang.name}
                className="w-5 h-auto rounded-[2px]"
              />
              <span className="text-sm font-medium">{lang.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Hidden div for google translate to attach to if needed */}
      <div id="google_translate_element" className="hidden"></div>
    </div>
  );
}
