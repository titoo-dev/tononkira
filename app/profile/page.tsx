import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Music, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SignOutButton } from "@/components/auth/sign-out-button";

async function ProfileContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const songs = await prisma.song.findMany({
    where: { publishedById: session.user.id },
    include: {
      artists: true,
      lyric: { select: { language: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      {/* Profile header */}
      <div className="mb-10 flex items-start justify-between">
        <div className="flex items-center gap-4">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
              {session.user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold">
              {session.user.name}
            </h1>
            <p className="text-muted-foreground text-sm">{session.user.email}</p>
            {!session.user.emailVerified && (
              <Badge variant="outline" className="text-destructive mt-1">
                Email non vérifié
              </Badge>
            )}
          </div>
        </div>
        <SignOutButton />
      </div>

      {/* Published songs */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Mes chansons publiées ({songs.length})
          </h2>
          <Link
            href="/publish"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            <Music className="mr-2 h-4 w-4" />
            Publier une chanson
          </Link>
        </div>

        {songs.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <Music className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-medium">Aucune chanson publiée</h3>
            <p className="text-muted-foreground mb-4">
              Commencez par publier votre première chanson sur Tononkira.
            </p>
            <Link
              href="/publish"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              Publier une chanson
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {songs.map((song) => (
              <Link
                key={song.id}
                href={`/lyrics/${song.artists[0]?.slug ?? "unknown"}/${song.slug}`}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
              >
                <div>
                  <h3 className="font-medium">{song.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {song.artists.map((a) => a.name).join(", ") || "Artiste inconnu"}
                  </p>
                </div>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  {song.lyric?.language && (
                    <Badge variant="secondary">{song.lyric.language}</Badge>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {song.createdAt.toLocaleDateString("fr-FR")}
                  </span>
                  <span>{song.views ?? 0} vues</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileContent />
    </Suspense>
  );
}
