interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <div className="mb-10 space-y-3">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground max-w-2xl text-lg">{description}</p>
    </div>
  );
}
