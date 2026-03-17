import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PublishForm } from "@/components/publish/publish-form";

async function PublishContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="container mx-auto max-w-2xl px-6 py-16">
      <div className="mb-8 space-y-2">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight">
          Publier une chanson
        </h1>
        <p className="text-muted-foreground">
          Partagez les paroles d&apos;une chanson malgache avec la communauté.
        </p>
      </div>

      <PublishForm />
    </main>
  );
}

export default function PublishPage() {
  return (
    <Suspense>
      <PublishContent />
    </Suspense>
  );
}
