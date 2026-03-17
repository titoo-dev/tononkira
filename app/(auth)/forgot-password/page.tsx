"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    if (error) {
      setError(error.message || "Une erreur est survenue.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="text-5xl">📧</div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight">
          Email envoyé
        </h1>
        <p className="text-muted-foreground">
          Si un compte existe avec l&apos;adresse{" "}
          <span className="text-foreground font-medium">{email}</span>,
          vous recevrez un lien de réinitialisation.
        </p>
        <Button variant="outline" asChild>
          <Link href="/sign-in">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la connexion
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight">
          Mot de passe oublié
        </h1>
        <p className="text-muted-foreground">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Envoyer le lien
        </Button>
      </form>

      <p className="text-muted-foreground text-center text-sm">
        <Link href="/sign-in" className="text-primary hover:underline">
          <ArrowLeft className="mr-1 inline h-3 w-3" />
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
