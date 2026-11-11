"use client";

import React, { useState, useEffect, useRef } from "react";
import { SEARCH_INDEX, SearchResultItem } from "@/lib/data/searchIndex";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = SEARCH_INDEX.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Simulators" && item.category === "Simulator") ||
      (selectedCategory === "Subjects" && item.category === "Subject") ||
      (selectedCategory === "Roadmaps" && item.category === "Roadmap") ||
      (selectedCategory === "Questions" && item.category === "Interview Question");

    if (!matchesCategory) return false;
    if (!query.trim()) return true;

    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    if (item.href.startsWith("#")) {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-2xl bg-[#0E1117] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh] z-10"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 bg-[#080A0E]">
          <Search className="w-4 h-4 text-zinc-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search disciplines, simulators, roadmaps, questions..."
            className="w-full bg-transparent text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-zinc-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="ml-2 px-1.5 py-0.5 text-[10px] bg-zinc-900 text-zinc-500 rounded border border-zinc-800 font-mono">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-zinc-800/80 bg-[#0A0C10] overflow-x-auto text-xs font-mono">
          {["All", "Simulators", "Subjects", "Roadmaps", "Questions"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                selectedCategory === cat
                  ? "bg-zinc-800 text-amber-300 font-semibold"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-zinc-500">
            {filteredResults.length} matches
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-xs text-zinc-400 font-mono">No matching records for &quot;{query}&quot;</p>
              <p className="text-[11px] text-zinc-600 mt-1 font-mono">
                Try searching for &quot;TCP&quot;, &quot;B+ Tree&quot;, &quot;Stack&quot;, &quot;CFS&quot;, or &quot;Process&quot;.
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? "bg-[#141822] border border-amber-400/40 text-white"
                      : "hover:bg-zinc-900/60 border border-transparent text-zinc-300"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-semibold truncate text-zinc-100 font-sans">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-1 font-sans">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-zinc-500 flex-shrink-0 mt-1 font-mono text-[10px]">
                    <span className="hidden sm:inline">{item.badge}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-zinc-600"}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer controls hint */}
        <div className="px-4 py-2 border-t border-zinc-800 bg-[#080A0E] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>KernelCS Master Index</span>
        </div>
      </div>
    </div>
  );
};
