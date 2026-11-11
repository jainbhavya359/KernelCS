"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07090D] border-t border-zinc-800 text-zinc-400 font-sans text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="inline-block">
              <span className="font-serif italic font-normal text-xl text-white tracking-tight">
                Kernel<span className="font-sans font-bold not-italic text-amber-400 text-xs ml-1 tracking-widest uppercase">CS</span>
              </span>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-sm">
              The first-principles computer science studio. Dedicated to teaching how machines, memory, protocols, and distributed systems compute physical truth.
            </p>

            <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>DETERMINISTIC RUNTIME ENGINE :: ONLINE</span>
            </div>
          </div>

          {/* Disciplines */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3 font-semibold">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <a href="#subjects" className="hover:text-white transition-colors">
                  Operating Systems
                </a>
              </li>
              <li>
                <a href="#subjects" className="hover:text-white transition-colors">
                  Database Systems
                </a>
              </li>
              <li>
                <a href="#subjects" className="hover:text-white transition-colors">
                  Computer Networks
                </a>
              </li>
              <li>
                <a href="#subjects" className="hover:text-white transition-colors">
                  Data Structures
                </a>
              </li>
              <li>
                <a href="#subjects" className="hover:text-white transition-colors">
                  System Design
                </a>
              </li>
            </ul>
          </div>

          {/* Laboratory */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3 font-semibold">
              Laboratory
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <a href="#demonstrations" className="hover:text-white transition-colors">
                  Stack Pointer (RSP)
                </a>
              </li>
              <li>
                <a href="#demonstrations" className="hover:text-white transition-colors">
                  CPU Preemptive Gantt
                </a>
              </li>
              <li>
                <a href="#demonstrations" className="hover:text-white transition-colors">
                  Wire Protocol Flight
                </a>
              </li>
              <li>
                <a href="#demonstrations" className="hover:text-white transition-colors">
                  B+ Tree Page Fanout
                </a>
              </li>
            </ul>
          </div>

          {/* Conduit & Defense */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3 font-semibold">
              Conduit &amp; Defense
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <a href="#roadmaps" className="hover:text-white transition-colors">
                  Silicon to Scale (12 Wks)
                </a>
              </li>
              <li>
                <a href="#roadmaps" className="hover:text-white transition-colors">
                  SDE Technical Fast-Track
                </a>
              </li>
              <li>
                <a href="#interview-prep" className="hover:text-white transition-colors">
                  URL in Browser Defense
                </a>
              </li>
              <li>
                <a href="#interview-prep" className="hover:text-white transition-colors">
                  Process vs Thread Rubric
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© 2026 KernelCS Studio. An inquiry into the mechanics of computation.</div>
          <div className="flex items-center gap-4">
            <span>Press ⌘K to search directory</span>
            <span>•</span>
            <a href="#hero" className="hover:text-white transition-colors">
              Return to Top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
