"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Terminal, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenAuthModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0C10]/95 backdrop-blur-md border-b border-zinc-800/80"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Typographic Logo */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif italic font-normal text-xl text-white tracking-tight">
                Kernel<span className="font-sans font-bold not-italic text-amber-400 text-xs ml-1 tracking-widest uppercase">CS</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
              <a
                href="#subjects"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Disciplines
              </a>
              <a
                href="#demonstrations"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Laboratory
              </a>
              <a
                href="#roadmaps"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Conduit
              </a>
              <a
                href="#learning-cycle"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Methodology
              </a>
              <a
                href="#interview-prep"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Verbal Defense
              </a>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#0E1117] hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded text-xs font-mono transition-all"
              title="Search Index (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Index Search</span>
              <kbd className="hidden sm:inline-block px-1 py-0.5 text-[10px] bg-zinc-900 text-zinc-500 rounded border border-zinc-800">
                ⌘K
              </kbd>
            </button>

            {/* Sign In */}
            <button
              onClick={onOpenAuthModal}
              className="hidden sm:inline-flex text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign In
            </button>

            {/* Start Learning CTA: Bone white, architectural */}
            <a
              href="#demonstrations"
              className="px-4 py-1.5 rounded bg-[#F1F5F9] hover:bg-white text-zinc-950 font-semibold text-xs font-sans tracking-wide transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Begin Study</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0C10] border-b border-zinc-800 px-5 py-5 space-y-3 font-mono text-xs">
          <a
            href="#subjects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white"
          >
            01 / Disciplines Directory
          </a>
          <a
            href="#demonstrations"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white"
          >
            02 / Interactive Laboratory
          </a>
          <a
            href="#roadmaps"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white"
          >
            03 / Engineering Conduit
          </a>
          <a
            href="#learning-cycle"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white"
          >
            04 / Pedagogical Cycle
          </a>
          <a
            href="#interview-prep"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-white"
          >
            05 / Verbal Defense
          </a>
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="text-zinc-400 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search (⌘K)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal?.();
              }}
              className="text-amber-400"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
