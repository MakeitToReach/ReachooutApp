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
import { ImageInput } from "@/components/imgInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

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
    btnText: "",
    btnLink: "",
  });
  return (
    <Dialog>
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
          <div className="space-y-2">
            <Label className="font-semibold">Service Image</Label>
            <ImageInput
              className="w-full"
              onImageUpload={(imgUrl) => {
                setService({ ...service, imgUrl: imgUrl });
              }}
              onImageRemove={() => setService({ ...service, imgUrl: "" })}
            />
          </div>
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter your service title"
            value={service.title}
            onChange={(e) => setService({ ...service, title: e.target.value })}
          />

          <div className="space-y-2">
            <Label className="font-semibold">Description</Label>
            <TipTapEditor
              value={service.description}
              onChange={(value) =>
                setService({ ...service, description: value })
              }
              placeholder="Enter service description"
              height="h-36"
              showToolbar={true}
            />
          </div>

          <ReqInput
            type="text"
            label="Category"
            placeholder="Enter your service category"
            value={service.category}
            onChange={(e) =>
              setService({ ...service, category: e.target.value })
            }
          />
          <div className="flex gap-2 w-full">
            <ReqInput
              type="text"
              label="Button Text"
              value={service.btnText}
              onChange={(e) =>
                setService({ ...service, btnText: e.target.value })
              }
            />
            <ReqInput
              type="text"
              label="Button Link"
              value={service.btnLink}
              onChange={(e) =>
                setService({ ...service, btnLink: e.target.value })
              }
            />
          </div>
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
                  btnText: "",
                  btnLink: "",
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4 z-[100] font-Poppins">
        <DialogHeader>
          <DialogTitle>
            Edit Service {serviceIdx !== undefined && `#${serviceIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="font-semibold">Service Image</Label>
            <ImageInput
              initialImgUrl={formData.imgUrl}
              className="w-full"
              onImageUpload={(imgUrl) => {
                handleChange("imgUrl", imgUrl);
              }}
              onImageRemove={() => handleChange("imgUrl", "")}
            />
          </div>
          <ReqInput
            type="text"
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <div className="space-y-2">
            <Label className="font-semibold">Description</Label>
            <TipTapEditor
              value={service.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Enter service description"
              height="h-36"
              showToolbar={true}
            />
          </div>
          <ReqInput
            type="text"
            label="Category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
          <div className="flex gap-2 w-full">
            <ReqInput
              type="text"
              label="Button Text"
              value={formData.btnText}
              onChange={(e) => handleChange("btnText", e.target.value)}
            />
            <ReqInput
              type="text"
              label="Button Link"
              value={formData.btnLink}
              onChange={(e) => handleChange("btnLink", e.target.value)}
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
