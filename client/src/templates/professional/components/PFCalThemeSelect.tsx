import * as React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface PFCalThemeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const PFCalThemeSelect: React.FC<PFCalThemeSelectProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent className="relative z-[70]">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  );
};
