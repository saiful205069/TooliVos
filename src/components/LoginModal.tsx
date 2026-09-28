"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Email/Password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  

  function handleToggleMode(mode: string) {
    resetStates();
    if (mode === 'register') {
        setIsRegister(true);
        setIsForgotPassword(false);
    } else if (mode === 'login') {
        setIsRegister(false);
        setIsForgotPassword(false);
    } else if (mode === 'forgot') {
        setIsForgotPassword(true);
        setIsRegister(false);
    }
  };

  useEffect(() => {
    // Reset state when modal closes
    if (!isLoginModalOpen) {
      handleToggleMode('login');
      setError("");
      setEmail("");
      setPassword("");
      setName("");
    }
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  function resetStates() {
    setError("");
    setSuccessMsg("");
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      await fetch('/api/logins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: res.user.email, method: 'Google' }) });
      closeLoginModal();
    } catch (err: any) {
      setError(err.message || "Failed to log in with Google");
    } finally {
      setLoading(false);
    }
  };


  
  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetStates();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await fetch('/api/logins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: userCredential.user.email, method: 'Email (Registered)' }) });
        closeLoginModal();
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password);
        await fetch('/api/logins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: res.user.email, method: 'Email' }) });
        closeLoginModal();
      }
    } catch (err: any) {
      console.error(err);
      let message = err.message || "An error occurred";
      if (err.code === "auth/email-already-in-use") message = "Email already exists";
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") message = "Invalid email or password";
      if (err.code === "auth/weak-password") message = "Password should be at least 6 characters";
      if (err.code === "auth/operation-not-allowed") message = "Sign-in method is not enabled in Firebase Console!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-on-surface">
              {isForgotPassword ? "Reset Password" : isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <button onClick={closeLoginModal} className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors">
              <span translate="no" className="material-symbols-outlined text-[20px] notranslate">close</span>
            </button>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm font-medium">{error}</div>}
            {successMsg && <div className="bg-green-50 text-green-700 p-3 rounded-xl mb-4 text-sm font-medium">{successMsg}</div>}

          
            {isForgotPassword ? (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">Enter your email address and we'll send you a link to reset your password.</p>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <span translate="no" className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 notranslate">mail</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-container text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-600"><button type="button" onClick={() => handleToggleMode('login')} className="text-primary font-bold hover:underline">Back to Sign In</button></p>
                </div>
              </form>
            ) : (
<form onSubmit={handleEmailSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <span translate="no" className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 notranslate">person</span>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" required />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <span translate="no" className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 notranslate">mail</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" required />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-gray-700">Password</label>
                    {!isRegister && (
                      <button type="button" onClick={() => handleToggleMode('forgot')} className="text-xs font-bold text-primary hover:underline">
                        Forgot Password?
                      </button>
                    )}
                  </div>
              <div className="relative">
                <span translate="no" className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 notranslate">lock</span>
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3 outline-none focus:border-primary focus:bg-white transition-colors" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center">
                  <span translate="no" className="material-symbols-outlined text-[20px] notranslate">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 rounded-xl shadow-sm transition-colors mt-2 disabled:opacity-70">
              {loading ? "Processing..." : isRegister ? "Sign Up" : "Sign In"}
            </button>
          </form>
            )}
            
            {!isForgotPassword && (
              <>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            {isRegister ? (
              <p className="text-gray-600">Already have an account? <button type="button" onClick={() => handleToggleMode('login')} className="text-primary font-bold hover:underline">Sign In</button></p>
            ) : (
              <p className="text-gray-600">Don't have an account? <button type="button" onClick={() => handleToggleMode('register')} className="text-primary font-bold hover:underline">Create one</button></p>
            )}
          </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
