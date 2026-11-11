"use client";

import React, { useState } from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSignedIn(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#0E1117] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden p-6 z-10 font-sans technical-schematic-grid">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs font-mono">
          <span className="text-amber-400 font-bold">KERNELCS STUDIO CONSOLE</span>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {signedIn ? (
          <div className="py-8 text-center space-y-3 font-mono text-xs">
            <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="text-sm font-bold text-white font-sans">Authentication Link Dispatched</h4>
            <p className="text-zinc-400">
              Dispatched a sign-in link to <strong className="text-zinc-200">{email}</strong>. Check your inbox to resume your laboratory state.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs"
            >
              Close Console
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-5 space-y-4">
            <div>
              <h4 className="text-lg font-serif text-white font-normal">Developer Access</h4>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Save your progress across simulations and track your oral defense readiness.
              </p>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <label className="text-zinc-500">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="engineer@domain.com"
                className="w-full px-3 py-2 bg-[#080A0E] border border-zinc-700 rounded text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#F1F5F9] hover:bg-white text-zinc-950 rounded text-xs font-semibold font-sans transition-all flex items-center justify-center gap-2"
            >
              <span>Dispatch Access Token</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="pt-2 text-center text-[11px] text-zinc-500 font-mono">
              Passwordless • Deterministic • Zero Tracking
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
