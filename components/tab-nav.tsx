import { CalendarIcon, Disc, Users } from "lucide-react";
import { CustomTab } from "./custom-tab";
import { Tabs, TabsList } from "./ui/tabs";
import { ViewSelector } from "./view-selector";
import { LyricsTabContent } from "./lyrics-tab-content";

// Tab navigation components
interface TabNavProps {
  defaultValue: string;
}

export function TabNav({ defaultValue }: TabNavProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <div className="mb-6 flex items-center justify-between border-b">
        <TabsList className="h-12 bg-transparent">
          <CustomTab
            value="popular"
            icon={<Disc className="h-4 w-4" />}
            label="Popular"
            colorClass="primary"
          />
          <CustomTab
            value="recent"
            icon={<CalendarIcon className="h-4 w-4" />}
            label="Recent"
            colorClass="primary"
          />
          <CustomTab
            value="alphabetical"
            icon={<Users className="h-4 w-4" />}
            label="A-Z"
            colorClass="primary"
          />
        </TabsList>

        <ViewSelector />
      </div>

      <LyricsTabContent
        value="popular"
        colorMapping={(i) =>
          i % 3 === 0 ? "primary" : i % 3 === 1 ? "secondary" : "accent"
        }
      />
      <LyricsTabContent
        value="recent"
        colorMapping={(i) =>
          i % 3 === 0 ? "accent" : i % 3 === 1 ? "primary" : "secondary"
        }
      />
      <LyricsTabContent
        value="alphabetical"
        colorMapping={(i) =>
          i % 3 === 0 ? "secondary" : i % 3 === 1 ? "accent" : "primary"
        }
        titleMapping={(i) => `Song ${String.fromCharCode(65 + i)} Title`}
      />
    </Tabs>
  );
}
