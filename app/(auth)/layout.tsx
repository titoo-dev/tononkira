export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid flex-1 lg:grid-cols-2">
      {/* Form side */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Hero side */}
      <div className="bg-primary/5 hidden items-center justify-center lg:flex">
        <div className="max-w-md space-y-6 p-12 text-center">
          <div className="text-6xl">🎵</div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight">
            Tononkira
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Rejoignez la communauté et partagez les paroles de vos chansons
            malgaches préférées.
          </p>
          <div className="text-muted-foreground/60 flex justify-center gap-8 pt-4 text-sm">
            <div>
              <div className="text-foreground text-2xl font-bold">1000+</div>
              <div>Chansons</div>
            </div>
            <div>
              <div className="text-foreground text-2xl font-bold">200+</div>
              <div>Artistes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
