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
import { F_SERVICE } from "../types/services.types";
import { Label } from "@/components/ui/label";

interface FAddServicePopupProps {
  children: React.ReactNode;
  onAdd: (service: F_SERVICE) => void;
}
export function FAddServicePopup({ children, onAdd }: FAddServicePopupProps) {
  const [service, setService] = useState<F_SERVICE>({
    title: "",
    description: "",
    imgUrl: "",
    category: "",
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
          <DialogTitle className="md:text-2xl">Add Service</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter your service title"
            value={service.title}
            onChange={(e) => setService({ ...service, title: e.target.value })}
          />

          <div className="space-y-2">
            <Label className="font-semibold">Description</Label>
            <textarea
              placeholder="Description"
              className="border p-2 w-full rounded-md h-20"
              value={service.description}
              onChange={(e) =>
                setService({ ...service, description: e.target.value })
              }
            />
          </div>

          <ReqInput
            type="text"
            label="Category"
            placeholder="Enter your service category"
            value={service.category}
            onChange={(e) => setService({ ...service, category: e.target.value })}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(service);
                setService({
                  title: "",
                  description: "",
                  category: "",
                  imgUrl: "",
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

interface FEditServicePopupProps {
  service: F_SERVICE;
  serviceIdx?: number;
  onSave: (updated: F_SERVICE) => void;
  children: React.ReactNode;
}

export const FEditServicePopup = ({
  service,
  serviceIdx,
  onSave,
  children,
}: FEditServicePopupProps) => {
  const [formData, setFormData] = useState<F_SERVICE>(service);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(service); // reset on open
  }, [open, service]);

  const handleChange = (key: keyof F_SERVICE, val: string) => {
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
            Edit Service {serviceIdx !== undefined && `#${serviceIdx + 1}`}
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
              placeholder="Description"
              className="border p-2 w-full rounded-md h-20"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <ReqInput
            type="text"
            label="Category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
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
