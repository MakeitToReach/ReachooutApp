"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ThemeObject } from "@/schemas/templates.schema";


type ThemePickerDialogProps = {
  children: React.ReactNode;
  initialTheme: ThemeObject;
  onThemeChange: (newTheme: ThemeObject) => void;
};

export function ThemePickerDialog({
  children,
  initialTheme,
  onThemeChange,
}: ThemePickerDialogProps) {
  const [theme, setTheme] = React.useState<ThemeObject>(initialTheme);

  const handleChange = (key: keyof ThemeObject, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onThemeChange(theme); // Inform parent component to update theme state
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-[100]">
        <DialogHeader>
          <DialogTitle>Customize Theme Colors</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {(
            [
              ["--template-primary", "Background"],
              ["--template-secondary", "Secondary Background"],
              ["--template-tertiary", "Tertiary Background"],
              ["--template-text-primary", "Title Text"],
              ["--template-text-secondary", "Description Text"],
              ["--template-text-tertiary", "Color Text"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                type="color"
                value={theme[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-20 h-10 p-0 border-none"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={handleApply}>Apply Theme</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
