import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PF_PROJECT } from "@/templates/professional/types/project";
import { CldUploadButton } from "next-cloudinary";
import ImageSelectButton from "../inputs/imageInputBtn";
import { ReqInput } from "../inputs/reqInput";
import { ImageInput } from "@/components/imgInput";

interface EditProjectPopupProps {
  project: PF_PROJECT;
  projectIdx?: number; // optional, for display/debug
  onSave: (updated: PF_PROJECT) => void;
  children: React.ReactNode;
}

export const EditProjectPopup = ({
  project,
  projectIdx,
  onSave,
  children,
}: EditProjectPopupProps) => {
  const [formData, setFormData] = useState<PF_PROJECT>(project);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(project); // reset on open
  }, [open, project]);

  const handleChange = (key: keyof PF_PROJECT, val: string) => {
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
            Edit Project {projectIdx !== undefined && `#${projectIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <ReqInput
            required={true}
            type="text"
            label="Title"
            placeholder="Enter your project link"
            value={formData.heading}
            onChange={(e) => handleChange("heading", e.target.value)}
          />
          <ReqInput
            required={true}
            type="text"
            label="Category Tag"
            placeholder="Enter your project category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />

          <ReqInput
            required={true}
            type="text"
            label="Description"
            placeholder="Enter your project description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <div className="flex flex-col items-center md:gap-10 gap-6">
            <ImageInput
              initialImgUrl={formData.imgUrl}
              className="w-full"
              onImageUpload={(imgUrl) => {
                handleChange("imgUrl", imgUrl);
              }}
              onImageRemove={() =>
                handleChange("imgUrl", "")
              }
            />

            <h1 className="text-xs md:text-lg">OR</h1>

            <ReqInput
              className="w-full"
              label="Video URL"
              type="text"
              placeholder="https://youtub.com/watch?v=******"
              value={formData.vidUrl}
              onChange={(e) => handleChange("vidUrl", e.target.value)}
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
