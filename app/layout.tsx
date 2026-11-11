import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kernel — Understand Computer Science from First Principles",
  description:
    "The interactive learning & interview preparation platform for software engineers. Master DSA, OS, DBMS, Networks, and System Design through visual simulations and deep first-principles comprehension.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0C10] text-[#E2E8F0] antialiased selection:bg-amber-500/20 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
