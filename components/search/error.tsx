/**
 * Error message component
 */
interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-destructive p-4 text-center text-sm">{message}</div>
  );
}

/**
 * Empty results message component
 */
interface NoResultsMessageProps {
  searchQuery: string;
}

export function NoResultsMessage({ searchQuery }: NoResultsMessageProps) {
  return (
    <div className="text-muted-foreground p-4 text-center text-sm">
      No results found for &quot;{searchQuery}&quot;
    </div>
  );
}
