import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const BackNavigation = () => (
  <div className="mb-10">
    <Link
      href="/"
      className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
      aria-label="Back to home"
    >
      <ChevronLeft className="h-4 w-4" />
      Back to home
    </Link>
  </div>
);
