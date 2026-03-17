"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { publishSong } from "@/lib/actions/publish-song";

export function PublishForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);

    const result = await publishSong(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push(`/lyrics/${result.artistSlug}/${result.songSlug}`);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre de la chanson</Label>
        <Input
          id="title"
          name="title"
          placeholder="Ex: Ianao no tiako"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="artist">Artiste</Label>
        <Input
          id="artist"
          name="artist"
          placeholder="Ex: Rija Ramanantoanina"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lyrics">Paroles</Label>
        <textarea
          id="lyrics"
          name="lyrics"
          rows={15}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Écrivez ou collez les paroles ici..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="language">Langue</Label>
          <select
            id="language"
            name="language"
            defaultValue="mg"
            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <option value="mg">Malgache</option>
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Lien source (optionnel)</Label>
          <Input
            id="url"
            name="url"
            type="url"
            placeholder="https://..."
          />
        </div>
      </div>

      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Publier la chanson
      </Button>
    </form>
  );
}
