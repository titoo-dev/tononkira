import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tononkira",
  // description: "Hirahira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Navigation */}
          <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
            <div className="container mx-auto py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link
                  href="/"
                  className="flex items-center"
                  aria-label="Tononkira Home"
                >
                  <Image
                    src="/brand.png"
                    alt="Tononkira Logo"
                    width={120}
                    height={120}
                    className="h-26 object-cover"
                  />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center space-x-1 md:flex">
                  {["Home", "Artists", "Top Songs", "About"].map((item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:bg-primary/10 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>

                {/* Search and Actions */}
                <div className="flex items-center gap-3">
                  <div className="relative hidden md:block">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      type="search"
                      placeholder="Search lyrics..."
                      className="bg-muted/50 w-[220px] rounded-full pl-10"
                    />
                  </div>

                  <Button
                    size="sm"
                    className="hidden rounded-full font-medium shadow-sm md:flex"
                  >
                    Sign In
                  </Button>

                  {/* Mobile buttons */}
                  <Button size="icon" variant="ghost" className="md:hidden">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 rounded-full md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="bg-background text-foreground">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
