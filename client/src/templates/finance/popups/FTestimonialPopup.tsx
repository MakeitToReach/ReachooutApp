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
import { F_TESTIMONIAL } from "../types/testimonials.types";
import { ImageInput } from "@/components/imgInput";
import { Textarea } from "@/components/ui/textarea";

interface FAddTestimonialPopupProps {
  children: React.ReactNode;
  onAdd: (testimonial: F_TESTIMONIAL) => void;
}

export function FAddTestimonialPopup({ children, onAdd }: FAddTestimonialPopupProps) {
  const [testimonial, setTestimonial] = useState<F_TESTIMONIAL>({
    avatarUrl: "",
    name: "",
    designation: "",
    message: "",
    rating: 5,
  });

  return (
    <Dialog >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] font-Poppins max-h-[90vh] overflow-y-scroll"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Testimonial</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ReqInput
            type="text"
            label="Name"
            placeholder="Enter client name"
            value={testimonial.name}
            onChange={(e) => setTestimonial({ ...testimonial, name: e.target.value })}
          />

          <ReqInput
            type="text"
            label="Designation"
            placeholder="Enter client designation"
            value={testimonial.designation}
            onChange={(e) =>
              setTestimonial({ ...testimonial, designation: e.target.value })
            }
          />

          <div className="space-y-2">
            <Label className="font-semibold">Message</Label>
            <Textarea
              placeholder="Enter testimonial message"
              className="border p-2 w-full rounded-md h-20"
              value={testimonial.message}
              onChange={(e) =>
                setTestimonial({ ...testimonial, message: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Rating</Label>
            <input
              type="range"
              min={0}
              max={5}
              step={1}
              value={testimonial.rating}
              onChange={(e) =>
                setTestimonial({ ...testimonial, rating: parseInt(e.target.value) })
              }
              className="w-full"
            />
            <div className="text-sm text-gray-600">Rating: {testimonial.rating}/5</div>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Avatar Image</Label>
            <ImageInput
              initialImgUrl={testimonial.avatarUrl}
              className="w-full"
              onImageUpload={(imgUrl) => {
                setTestimonial({ ...testimonial, avatarUrl: imgUrl });
              }}
              onImageRemove={() => setTestimonial({ ...testimonial, avatarUrl: "" })}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(testimonial);
                setTestimonial({
                  avatarUrl: "",
                  name: "",
                  designation: "",
                  message: "",
                  rating: 5,
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

interface FEditTestimonialPopupProps {
  testimonial: F_TESTIMONIAL;
  testimonialIdx?: number;
  onSave: (updated: F_TESTIMONIAL) => void;
  children: React.ReactNode;
}

export const FEditTestimonialPopup = ({
  testimonial,
  testimonialIdx,
  onSave,
  children,
}: FEditTestimonialPopupProps) => {
  const [formData, setFormData] = useState<F_TESTIMONIAL>(testimonial);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(testimonial); // reset on open
  }, [open, testimonial]);

  const handleChange = (key: keyof F_TESTIMONIAL, val: string | number) => {
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
            Edit Testimonial {testimonialIdx !== undefined && `#${testimonialIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <ReqInput
            type="text"
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <ReqInput
            type="text"
            label="Designation"
            value={formData.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
          />

          <div className="space-y-2">
            <Label className="font-semibold">Message</Label>
            <textarea
              placeholder="Enter testimonial message"
              className="border p-2 w-full rounded-md h-20"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Rating</Label>
            <input
              type="range"
              min={0}
              max={5}
              step={1}
              value={formData.rating}
              onChange={(e) =>
                handleChange("rating", e.target.value)
              }
              className="w-full"
            />
            <div className="text-sm text-gray-600">Rating: {formData.rating}/5</div>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Avatar Image</Label>
            <ImageInput
              initialImgUrl={formData.avatarUrl}
              className="w-full"
              onImageUpload={(imgUrl) => {
                handleChange("avatarUrl", imgUrl);
              }}
              onImageRemove={() => handleChange("avatarUrl", "")}
            />
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
