import Link from "next/link";
import React from "react";

export const FooterSection = () => {
  return (
    <footer className="border-border/40 bg-background/80 border-t backdrop-blur-sm">
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Main footer content */}
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-medium">
              Explore Malagasy Music
            </h3>
            <p className="text-muted-foreground mx-auto max-w-md text-sm">
              Your ultimate resource for authentic Malagasy lyrics and music
              discovery. Join our community of music lovers today.
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
  );
};
