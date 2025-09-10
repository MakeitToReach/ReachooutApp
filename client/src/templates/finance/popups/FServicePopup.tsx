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
import { TipTapEditor } from "@/components/ui/TipTapEditor";
import { ImageVideoInput } from "@/components/editor-components/inputs/ImageVideoInput";

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
    vidUrl: "",
    btnLink: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Service</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ImageVideoInput
            className="w-full"
            onImageUpload={(imgUrl) => {
              setService({ ...service, imgUrl: imgUrl });
            }}
            onImageRemove={() => setService({ ...service, imgUrl: "" })}
            onVideoUrlChange={(vidUrl) => {
              setService({ ...service, vidUrl: vidUrl });
            }}
          />
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter your service title"
            onChange={(e) => setService({ ...service, title: e.target.value })}
          />

          <div className="space-y-2">
            <Label>Description</Label>
            <TipTapEditor
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
            onChange={(e) =>
              setService({ ...service, category: e.target.value })
            }
          />
          <div className="flex gap-2 w-full">
            <ReqInput
              type="text"
              placeholder="View Service"
              className="w-full"
              label="Button Text"
              onChange={(e) =>
                setService({ ...service, btnText: e.target.value })
              }
            />
            <ReqInput
              type="text"
              placeholder="https://example.com"
              className="w-full"
              label="Button Link"
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
                  vidUrl: "",
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
      <DialogContent className="space-y-4 sm:max-w-[40vw] max-h-[90vh] overflow-y-scroll font-Poppins">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl">
            Edit Service {serviceIdx !== undefined && `#${serviceIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <ImageVideoInput
            initialImgUrl={formData.imgUrl}
            className="w-full"
            onImageUpload={(imgUrl) => {
              handleChange("imgUrl", imgUrl);
            }}
            onImageRemove={() => handleChange("imgUrl", "")}
            onVideoUrlChange={(vidUrl) => {
              handleChange("vidUrl", vidUrl);
            }}
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
              className="w-full"
              label="Button Text"
              value={formData.btnText}
              onChange={(e) => handleChange("btnText", e.target.value)}
            />
            <ReqInput
              type="text"
              className="w-full"
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
