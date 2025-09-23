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
import { F_CERTIFICATION } from "../types/certification.types";
import { ImageInput } from "@/components/imgInput";

interface FAddCertificationPopupProps {
  children: React.ReactNode;
  onAdd: (certification: F_CERTIFICATION) => void;
}
export function FAddCertificationPopup({
  children,
  onAdd,
}: FAddCertificationPopupProps) {
  const [certification, setCertification] = useState<F_CERTIFICATION>({
    title: "",
    imgUrl: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[40vw] max-h-[90vh] overflow-y-scroll font-Poppins">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl">Add Certification</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="space-y-2">
            <Label>Certification Image</Label>
            <ImageInput
              initialImgUrl={certification.imgUrl}
              className="w-full"
              onImageUpload={(imgUrl) => {
                setCertification({ ...certification, imgUrl: imgUrl });
              }}
              onImageRemove={() =>
                setCertification({ ...certification, imgUrl: "" })
              }
            />
            <p className="text-xs text-gray-700">Best fit: 4:3 ratio (652x503 px)</p>
          </div>
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter certification title"
            value={certification.title}
            onChange={(e) =>
              setCertification({ ...certification, title: e.target.value })
            }
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(certification);
                setCertification({
                  title: "",
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

interface FEditCertificationPopupProps {
  certification: F_CERTIFICATION;
  certificationIdx?: number;
  onSave: (updated: F_CERTIFICATION) => void;
  children: React.ReactNode;
}

export const FEditCertificationPopup = ({
  certification,
  certificationIdx,
  onSave,
  children,
}: FEditCertificationPopupProps) => {
  const [formData, setFormData] = useState<F_CERTIFICATION>(certification);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(certification); // reset on open
  }, [open, certification]);

  const handleChange = (key: keyof F_CERTIFICATION, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[40vw] max-h-[90vh] overflow-y-scroll font-Poppins">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl">
            Edit Certification{" "}
            {certificationIdx !== undefined && `#${certificationIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Certification Image</Label>
            <ImageInput
              initialImgUrl={formData.imgUrl}
              className="w-full"
              onImageUpload={(imgUrl) => {
                handleChange("imgUrl", imgUrl);
              }}
              onImageRemove={() => handleChange("imgUrl", "")}
            />
            <p className="text-xs text-gray-700">Best fit: 4:3 ratio (652x503 px)</p>
          </div>
          <ReqInput
            type="text"
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
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
