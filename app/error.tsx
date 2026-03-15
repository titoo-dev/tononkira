"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2">
          <div className="flex justify-center">
            <AlertTriangle size={64} className="text-destructive" />
          </div>
          <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Something Went Wrong
          </h1>
          <p className="text-muted-foreground text-lg">
            We encountered an unexpected error. Our team has been notified and
            is working to fix the issue.
          </p>
          {error.digest && (
            <p className="text-muted-foreground border-border bg-muted/30 mt-2 rounded-md border px-2 py-1 text-sm">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-8"
          >
            <RefreshCw size={18} />
            Try Again
          </Button>
          <Link
            href="/"
            className="border-primary/30 bg-background ring-offset-background hover:bg-primary/10 focus-visible:ring-ring inline-flex h-11 items-center justify-center gap-2 rounded-full border px-8 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
