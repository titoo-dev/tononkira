"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { User, LogOut, Music, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function UserMenu() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  if (isPending) {
    return <div className="bg-muted h-9 w-9 animate-pulse rounded-full" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/sign-in">Connexion</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/sign-up">S&apos;inscrire</Link>
        </Button>
      </div>
    );
  }

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-muted" aria-label="Menu utilisateur">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium">
              {session.user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="border-b px-3 py-2 mb-1">
          <p className="text-sm font-medium truncate">{session.user.name}</p>
          <p className="text-muted-foreground text-xs truncate">{session.user.email}</p>
        </div>
        <Link
          href="/profile"
          className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
        >
          <User className="h-4 w-4" />
          Mon profil
        </Link>
        <Link
          href="/publish"
          className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
        >
          <Music className="h-4 w-4" />
          Publier une chanson
        </Link>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="text-destructive hover:bg-destructive/10 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50"
        >
          {signingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          {signingOut ? "Déconnexion..." : "Déconnexion"}
        </button>
      </PopoverContent>
    </Popover>
  );
}
