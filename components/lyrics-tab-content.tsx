import { LyricsList } from "./lyrics-list";
import { TabsContent } from "./ui/tabs";

interface LyricsTabContentProps {
  value: string;
  currentPage: number;
}

export function LyricsTabContent({
  value,
  currentPage,
}: LyricsTabContentProps) {
  return (
    <TabsContent value={value} className="mt-0 space-y-4">
      <LyricsList currentPage={currentPage} />
    </TabsContent>
  );
}
