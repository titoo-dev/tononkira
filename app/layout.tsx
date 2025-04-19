import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import NextTopLoader from "nextjs-toploader";
import GlobalSearch from "@/components/search";

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
  const { userId } = await auth();
  const isSignedIn = !!userId;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${playfair.variable} antialiased`}>
          <NextTopLoader
            showSpinner={false}
            shadow={false}
            color="var(--primary)"
          />
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
                    height={60}
                    className="h-16 object-cover"
                  />
                </Link>

                {/* Search and Actions */}
                <div className="flex items-center gap-3">
                  <GlobalSearch />

                  {!isSignedIn && (
                    <Button
                      asChild
                      className="hidden rounded-full font-medium shadow-sm md:flex"
                    >
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                  )}

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

          <div className="bg-background text-foreground">{children}</div>

          {/* Footer */}
          <footer className="border-border/40 bg-background/80 border-t backdrop-blur-sm">
            <div className="container mx-auto py-8">
              <div className="mx-auto max-w-3xl text-center">
                {/* Main footer content */}
                <div className="space-y-4">
                  <h3 className="font-playfair text-2xl font-medium">
                    Explore Malagasy Music
                  </h3>
                  <p className="text-muted-foreground mx-auto max-w-md text-sm">
                    Your ultimate resource for authentic Malagasy lyrics and
                    music discovery. Join our community of music lovers today.
                  </p>

                  {/* Quick links */}
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4">
                    <Link
                      href="/about"
                      className="hover:text-primary text-sm transition-colors"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="hover:text-primary text-sm transition-colors"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/privacy"
                      className="hover:text-primary text-sm transition-colors"
                    >
                      Privacy
                    </Link>
                    <Link
                      href="/terms"
                      className="hover:text-primary text-sm transition-colors"
                    >
                      Terms
                    </Link>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-border/40 mt-8 border-t pt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  © {new Date().getFullYear()} Tononkira. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
