"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { Label } from "@/components/ui/label";
import { F_FEATURE } from "../types/why-choose-us.types";
import { IconPicker } from "@/components/editor-components/inputs/iconPicker";

interface FAddFeaturePopupProps {
  children: React.ReactNode;
  onAdd: (feature: F_FEATURE) => void;
}

export function FAddFeaturePopup({ children, onAdd }: FAddFeaturePopupProps) {
  const [feature, setFeature] = useState<F_FEATURE>({
    icon: "",
    title: "",
    description: "",
  });

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] font-Poppins"
        style={{ overflow: "visible" }}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Feature</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter feature title"
            value={feature.title}
            onChange={(e) => setFeature({ ...feature, title: e.target.value })}
          />

          <div className="space-y-2">
            <Label className="font-semibold">Description</Label>
            <textarea
              placeholder="Enter feature description"
              className="border p-2 w-full rounded-md h-20"
              value={feature.description}
              onChange={(e) =>
                setFeature({ ...feature, description: e.target.value })
              }
            />
          </div>

          <IconPicker
            value={feature.icon}
            onChange={(icon) => setFeature({ ...feature, icon: icon })}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(feature);
                setFeature({
                  icon: "",
                  title: "",
                  description: "",
                });
              }}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface FEditFeaturePopupProps {
  feature: F_FEATURE;
  featureIdx?: number;
  onSave: (updated: F_FEATURE) => void;
  children: React.ReactNode;
}

export const FEditFeaturePopup = ({
  feature,
  featureIdx,
  onSave,
  children,
}: FEditFeaturePopupProps) => {
  const [formData, setFormData] = useState<F_FEATURE>(feature);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(feature); // reset on open
  }, [open, feature]);

  const handleChange = (key: keyof F_FEATURE, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4 z-[100] font-Poppins">
        <DialogHeader>
          <DialogTitle>
            Edit Feature {featureIdx !== undefined && `#${featureIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <ReqInput
            type="text"
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <div className="space-y-2">
            <Label className="font-semibold">Description</Label>
            <textarea
              placeholder="Enter feature description"
              className="border p-2 w-full rounded-md h-20"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <IconPicker
            value={formData.icon}
            onChange={(icon) => handleChange("icon", icon)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
