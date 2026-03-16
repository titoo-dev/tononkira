import { TabsTrigger } from "./ui/tabs";

interface CustomTabProps {
  value: string;
  icon: React.ReactNode;
  label: string;
  colorClass: string;
}

export function CustomTab({ value, icon, label }: Omit<CustomTabProps, "colorClass"> & { colorClass?: string }) {
  return (
    <TabsTrigger
      value={value}
      className="data-[state=active]:border-primary h-12 rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:shadow-none"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
    </TabsTrigger>
  );
}
