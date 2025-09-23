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
import { F_TIMELINE_STEP } from "../types/timeline.types";
import { ImageInput } from "@/components/imgInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface FAddTimelinePopupProps {
  children: React.ReactNode;
  onAdd: (step: F_TIMELINE_STEP) => void;
}
export function FAddTimelinePopup({ children, onAdd }: FAddTimelinePopupProps) {
  const [step, setStep] = useState<F_TIMELINE_STEP>({
    badgeText: "",
    image: "",
    title: "",
    description: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[40vw] max-h-[90vh] font-Poppins">
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Timeline Step</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ReqInput
            type="text"
            label="Badge Text"
            placeholder="Enter badge text"
            value={step.badgeText}
            onChange={(e) => setStep({ ...step, badgeText: e.target.value })}
          />

          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter step title"
            value={step.title}
            onChange={(e) => setStep({ ...step, title: e.target.value })}
          />

          <div className="space-y-2">
            <Label>Description</Label>
            <TipTapEditor
              placeholder="Enter step description"
              value={step.description}
              onChange={(value) => setStep({ ...step, description: value })}
              height="h-20"
            />
          </div>

          <div className="space-y-2">
            <Label>Timeline Image</Label>
            <ImageInput
              className="w-full"
              onImageUpload={(imgUrl) => {
                setStep({ ...step, image: imgUrl });
              }}
              onImageRemove={() => setStep({ ...step, image: "" })}
            />
            <p className="text-xs text-gray-700">
              Best fit: 3:2 ratio (640x427 px)
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(step);
                setStep({
                  badgeText: "",
                  image: "",
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

interface FEditTimelinePopupProps {
  step: F_TIMELINE_STEP;
  stepIdx?: number;
  onSave: (updated: F_TIMELINE_STEP) => void;
  children: React.ReactNode;
}

export const FEditTimelinePopup = ({
  step,
  stepIdx,
  onSave,
  children,
}: FEditTimelinePopupProps) => {
  const [formData, setFormData] = useState<F_TIMELINE_STEP>(step);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(step); // reset on open
  }, [open, step]);

  const handleChange = (key: keyof F_TIMELINE_STEP, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4 sm:max-w-[40vw] max-h-[90vh] font-Poppins">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl">
            Edit Timeline Step {stepIdx !== undefined && `#${stepIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <ReqInput
            type="text"
            label="Badge Text"
            value={formData.badgeText}
            onChange={(e) => handleChange("badgeText", e.target.value)}
          />

          <ReqInput
            type="text"
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <div className="space-y-2">
            <Label>Description</Label>
            <TipTapEditor
              placeholder="Enter step description"
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              height="h-20"
            />
          </div>

          <div className="space-y-2">
            <Label>Timeline Image</Label>
            <ImageInput
              initialImgUrl={formData.image}
              className="w-full"
              onImageUpload={(imgUrl) => {
                handleChange("image", imgUrl);
              }}
              onImageRemove={() => handleChange("image", "")}
            />
            <p className="text-xs text-gray-700">
              Best fit: 3:2 ratio (640x427 px)
            </p>
          </div>
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
