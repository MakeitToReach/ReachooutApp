import React, { useState, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Label } from "./label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";

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
  const [tempColor, setTempColor] = useState(value);

  useEffect(() => {
    setTempColor(value);
  }, [value]);

  const handleConfirm = () => {
    onChange(tempColor);
  };

  const handleCancel = () => {
    setTempColor(value);
  };

  return (
    <div className={className}>
      {label && <Label className="mb-1 block">{label}</Label>}
      <div className="flex items-center gap-2 flex-col">
        <HexColorPicker
          color={tempColor}
          onChange={setTempColor}
          className="w-32 h-32"
        />
        <div className="flex items-center gap-2">
          <p>Hex:</p>
          <HexColorInput
            color={tempColor}
            onChange={setTempColor}
            prefixed
            className="border rounded px-2 py-1 w-32 text-sm bg-background text-foreground"
            aria-label="Hex color input"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <Button 
            onClick={handleConfirm}
            size="sm"
            variant="default"
          >
            Confirm
          </Button>
          <Button 
            onClick={handleCancel}
            size="sm"
            variant="outline"
          >
            Cancel
          </Button>
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
  const [tempColor, setTempColor] = useState(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTempColor(value);
  }, [value]);

  const handleConfirm = () => {
    onChange(tempColor);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempColor(value);
  };

  return (
    <div className={className}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle className="hidden">Pick a color</DialogTitle>
        </DialogHeader>
        <DialogContent className="w-auto p-14 flex flex-col items-center gap-2 z-[9999] max-w-fit">
          <div className="flex items-center gap-2 flex-col">
            <HexColorPicker
              color={tempColor}
              onChange={setTempColor}
              className="w-32 h-32"
            />
            <div className="flex items-center gap-2">
              <p>Hex:</p>
              <HexColorInput
                color={tempColor}
                onChange={setTempColor}
                prefixed
                className="border rounded px-2 py-1 w-32 text-sm bg-background text-foreground"
                aria-label="Hex color input"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button 
                onClick={handleConfirm}
                size="sm"
                variant="default"
              >
                Confirm Color
              </Button>
              <Button 
                onClick={handleCancel}
                size="sm"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
