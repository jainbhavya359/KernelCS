"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ExploreSubjects } from "@/components/subjects/ExploreSubjects";
import { InteractiveDemos } from "@/components/demonstrations/InteractiveDemos";
import { LearningPaths } from "@/components/roadmaps/LearningPaths";
import { LearningCycle } from "@/components/learning-cycle/LearningCycle";
import { InterviewPrep } from "@/components/interview/InterviewPrep";
import { FinalCta } from "@/components/cta/FinalCta";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/search/SearchModal";
import { AuthModal } from "@/components/ui/AuthModal";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090D14] text-[#F8FAFC] selection:bg-emerald-500/20 selection:text-emerald-300 relative flex flex-col">
      {/* Global Navigation */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section: Editorial Statement & 16-Bit Datapath */}
        <Hero />

        {/* Disciplines: 8 Core Computer Science Areas */}
        <ExploreSubjects />

        {/* Interactive Laboratory: 5 Technical Demonstrations */}
        <InteractiveDemos />

        {/* Learning Roadmaps: Progressive Systems Tracks */}
        <LearningPaths />

        {/* Methodology: 5-Stage First-Principles Process */}
        <LearningCycle />

        {/* Technical Interview Preparation & Deconstruction */}
        <InterviewPrep />

        {/* Epilogue & Call to Action */}
        <FinalCta />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
