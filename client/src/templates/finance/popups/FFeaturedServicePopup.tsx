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
import { IconPicker } from "@/components/editor-components/inputs/iconPicker";
import { F_FEATURED_SERVICE } from "../types/featured-services.types";

interface FAddFeaturedServicePopupProps {
  children: React.ReactNode;
  onAdd: (service: F_FEATURED_SERVICE) => void;
}
export function FAddFeaturedServicePopup({
  children,
  onAdd,
}: FAddFeaturedServicePopupProps) {
  const [service, setService] = useState<F_FEATURED_SERVICE>({
    title: "",
    subtitle: "",
    icon: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[40vw] max-h-[90vh] font-Poppins"
      >
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Featured Service</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter your featured service title"
            value={service.title}
            onChange={(e) => setService({ ...service, title: e.target.value })}
          />

          <div className="space-y-2">
            <Label className="font-semibold">Subtitle</Label>
            <textarea
              placeholder="Subtitle"
              className="border p-2 w-full rounded-md h-20"
              value={service.subtitle}
              onChange={(e) =>
                setService({ ...service, subtitle: e.target.value })
              }
            />
          </div>
          <IconPicker
            value={service.icon}
            onChange={(icon) => setService({ ...service, icon: icon })}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(service);
                setService({
                  title: "",
                  subtitle: "",
                  icon: "",
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

interface FEditFeaturedServicePopupProps {
  service: F_FEATURED_SERVICE;
  serviceIdx?: number;
  onSave: (updated: F_FEATURED_SERVICE) => void;
  children: React.ReactNode;
}

export const FEditFeaturedServicePopup = ({
  service,
  serviceIdx,
  onSave,
  children,
}: FEditFeaturedServicePopupProps) => {
  const [formData, setFormData] = useState<F_FEATURED_SERVICE>(service);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(service); // reset on open
  }, [open, service]);

  const handleChange = (key: keyof F_FEATURED_SERVICE, val: string) => {
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
            Edit Featured Service {serviceIdx !== undefined && `#${serviceIdx + 1}`}
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
            <Label className="font-semibold">Subtitle</Label>
            <textarea
              placeholder="Subtitle"
              className="border p-2 w-full rounded-md h-20"
              value={formData.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
            />
          </div>
          <IconPicker
            value={formData.icon}
            onChange={(e) => handleChange("icon", e)}
          />

          {/* TODO:add image input here */}
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
