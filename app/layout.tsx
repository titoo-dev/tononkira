import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { HeaderSection } from "@/components/header-section";
import { FooterSection } from "@/components/footer-section";
import SearchResultSection from "@/components/search-result-section";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tononkira",
  // description: "Hirahira",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${playfair.variable} antialiased`}>
          <NextTopLoader
            showSpinner={false}
            shadow={false}
            color="var(--primary)"
          />

          <HeaderSection />

          <SearchResultSection />

          <div className="bg-background text-foreground">{children}</div>

          <FooterSection />

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
