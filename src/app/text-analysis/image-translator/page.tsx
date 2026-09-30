"use client";
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolInfo from "@/components/ToolInfo";
import { useAuth } from "@/context/AuthContext";

export default function ImageTranslatorPage() {
  const { openLoginModal, user } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTranslate = async () => {
    if (!user) {
      openLoginModal();
      return;
    }
    if (!image) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          prompt: "Please act as an Image Translator. Extract all the text from this image and translate it to English (or identify the languages and translate them). Provide the translation clearly.",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
      } else {
        setResult("Error processing request: " + data.error);
      }
    } catch (err) {
      setResult("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-space-md py-space-xl">
        <div className="text-center mb-space-xl">
          <h1 className="font-display text-display-sm text-on-surface mb-space-sm">
            Image Translator
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Free online image translator powered by AI. Upload an image to extract and translate text instantly.
          </p>
        </div>

        <div className="bg-surface-card rounded-3xl p-space-lg shadow-sm border border-outline-variant mb-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
            {/* Input Section */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-space-sm">
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  Upload Image
                </span>
                {image && (
                  <button 
                    onClick={() => setImage(null)} 
                    className="text-xs text-red-500 hover:underline font-bold"
                  >
                    Clear Image
                  </button>
                )}
              </div>
              
              {!image ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 min-h-[300px] border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center bg-surface cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span translate="no" className="material-symbols-outlined text-4xl text-primary mb-2 notranslate">
                    cloud_upload
                  </span>
                  <p className="text-sm text-on-surface-variant font-medium">
                    Click or drag image to upload
                  </p>
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex-1 min-h-[300px] border border-outline-variant rounded-2xl bg-surface p-2 flex items-center justify-center relative overflow-hidden">
                  <img src={image} alt="Uploaded" className="max-w-full max-h-[400px] object-contain rounded-xl" />
                </div>
              )}

              <button
                onClick={handleTranslate}
                disabled={!image || loading}
                className="mt-space-md w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg py-space-md rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Translating..." : "Translate Image"}
                <span translate="no" className="material-symbols-outlined text-[20px] notranslate">
                  translate
                </span>
              </button>
            </div>

            {/* Output Section */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-space-sm">
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  Translation Result
                </span>
              </div>
              <div className="flex-1 bg-surface border border-outline-variant rounded-2xl p-space-md min-h-[300px] overflow-auto whitespace-pre-wrap font-body-md text-body-md text-on-surface">
                {result ? (
                  result
                ) : (
                  <span className="text-on-surface-variant/50 italic flex items-center justify-center h-full">
                    Your translated text will appear here...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <ToolInfo slug="image-translator" toolName="Image Translator" />
      </main>
      <Footer />
    </div>
  );
}
