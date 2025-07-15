import React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Label } from "./label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={className}>
      {label && <Label className="mb-1 block">{label}</Label>}
      <div className="flex items-center gap-2 flex-col">
        <HexColorPicker
          color={value}
          onChange={onChange}
          className="w-32 h-32"
        />
        <div className="flex items-center gap-2">
          <p>Hex:</p>
          <HexColorInput
            color={value}
            onChange={onChange}
            prefixed
            className="border rounded px-2 py-1 w-32 text-sm bg-background text-foreground"
            aria-label="Hex color input"
          />
        </div>
      </div>
    </div>
  );
};

export const ColorPickerPopup: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  className,
  children,
}) => {
  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle className="hidden">Pick a color</DialogTitle>
        </DialogHeader>
        <DialogContent className="w-auto p-14 flex flex-col items-center gap-2 z-[9999] max-w-fit">
          <ColorPicker value={value} onChange={onChange} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
