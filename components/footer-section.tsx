import Link from "next/link";
import { connection } from "next/server";

export async function FooterSection() {
  await connection();
  return (
    <footer className="border-border/40 bg-background/80 mt-auto border-t backdrop-blur-sm">
      <div className="container mx-auto px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
          {/* Brand column */}
          <div className="space-y-2">
            <h3 className="font-playfair text-lg font-semibold">Tononkira</h3>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Your ultimate resource for authentic Malagasy lyrics and music discovery.
            </p>
          </div>

          {/* Nav column */}
          <nav aria-label="Footer navigation">
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-1">
              {[
                { href: "/about", label: "About" },
                { href: "/lyrics", label: "Lyrics" },
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Copyright */}
        <div className="border-border/40 mt-8 border-t pt-6">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Tononkira. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
