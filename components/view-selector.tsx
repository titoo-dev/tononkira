import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ViewSelector() {
  return (
    <Select defaultValue="grid">
      <SelectTrigger className="border-muted w-[120px] bg-transparent">
        <SelectValue placeholder="View" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="grid">Grid View</SelectItem>
        <SelectItem value="list">List View</SelectItem>
      </SelectContent>
    </Select>
  );
}
