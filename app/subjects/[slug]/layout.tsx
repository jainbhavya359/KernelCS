import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Learning Workspace — KernelCS",
};

export default function SubjectWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#090D14] text-[#F8FAFC] flex flex-col">
      {/* Workspace Topbar — slimmer than homepage Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-[#0A0C10]/95 backdrop-blur-md border-b border-zinc-800/80 flex items-center px-4 sm:px-6 gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-mono flex-shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">KernelCS</span>
        </Link>

        <div className="w-px h-5 bg-zinc-800 flex-shrink-0" />

        {/* Breadcrumb slot — filled by page */}
        <div id="workspace-breadcrumb" className="flex-1 min-w-0 text-xs font-mono text-zinc-500 truncate" />

        {/* Logo mark */}
        <Link href="/" className="ml-auto flex-shrink-0">
          <span className="font-serif italic font-normal text-base text-white tracking-tight">
            Kernel<span className="font-sans font-bold not-italic text-amber-400 text-[10px] ml-0.5 tracking-widest uppercase">CS</span>
          </span>
        </Link>
      </header>

      {/* Main workspace content — offset by topbar */}
      <main className="flex-1 pt-12">
        {children}
      </main>
    </div>
  );
}

