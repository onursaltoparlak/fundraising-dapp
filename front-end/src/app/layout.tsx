import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revive the Grand Stage",
  description:
    "Support the restoration of our beloved community theater. Donate STX to help us return the magic to the stage!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <>
            <Navbar />
            {children}
            <footer style={{
              background: 'var(--primary-red)',
              color: 'var(--primary-gold)',
              padding: '2rem 0',
              marginTop: '4rem',
              textAlign: 'center',
              fontFamily: 'Georgia, Times New Roman, serif',
              borderTop: '4px solid var(--primary-gold)'
            }}>
              <nav style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <a href="#about">About the Theater</a>
                <a href="#restoration">Restoration Plans</a>
                <a href="#shows">Upcoming Shows</a>
                <a href="#contact">Contact Us</a>
              </nav>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                &copy; 2025 Revive the Grand Stage. All rights reserved.
              </div>
            </footer>
          </>
        </Providers>
      </body>
    </html>
  );
}
