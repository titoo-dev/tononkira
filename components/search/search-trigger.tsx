import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

/**
 * Search input field that triggers the popover
 */
interface SearchTriggerProps {
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchTrigger({ searchQuery, onChange }: SearchTriggerProps) {
  return (
    <div className="relative">
      <SearchIcon
        aria-hidden="true"
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
      />
      <Input
        type="search"
        defaultValue={searchQuery}
        onChange={onChange}
        placeholder="Search lyrics..."
        className="bg-muted/50 w-[220px] rounded-full pl-10"
        aria-label="Search lyrics"
      />
    </div>
  );
}
