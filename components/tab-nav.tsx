import { CalendarIcon, Disc, Users } from "lucide-react";
import { CustomTab } from "./custom-tab";
import { Tabs, TabsContent, TabsList } from "./ui/tabs";
import { ViewSelector } from "./view-selector";
import { LyricsTabContent } from "./lyrics-tab-content";
import { Suspense } from "react";
import { LyricsListSkeleton } from "./lyrics-list-skeleton";

// Tab navigation components
interface TabNavProps {
  defaultValue: string;
  currentPage: number;
}

export function TabNav({ defaultValue, currentPage }: TabNavProps) {
  const tabs = [
    {
      value: "popular",
      icon: <Disc className="h-4 w-4" />,
      label: "Popular",
      colorClass: "primary",
    },
    {
      value: "recent",
      icon: <CalendarIcon className="h-4 w-4" />,
      label: "Recent",
      colorClass: "primary",
    },
    {
      value: "alphabetical",
      icon: <Users className="h-4 w-4" />,
      label: "A-Z",
      colorClass: "primary",
    },
  ];

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <div className="mb-6 flex items-center justify-between border-b">
        <TabsList className="h-12 bg-transparent">
          {tabs.map((tab) => (
            <CustomTab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.label}
              colorClass={tab.colorClass}
            />
          ))}
        </TabsList>

        <ViewSelector />
      </div>

      {tabs.map((tab, index) => (
        <TabsContent
          key={tab.value + index}
          value={tab.value}
          className="mt-0 space-y-4"
        >
          <Suspense key={index + currentPage} fallback={<LyricsListSkeleton />}>
            <LyricsTabContent key={tab.value} currentPage={currentPage} />
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  );
}
