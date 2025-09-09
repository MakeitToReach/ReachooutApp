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
import { ReqInput } from "../inputs/reqInput";
import { ImageInput } from "@/components/imgInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

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
      <DialogContent className="space-y-4 font-Poppins max-h-[90vh] sm:max-w-[40vw] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="md:text-2xl">
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

          <div className="space-y-2">
            <h1 className="text-sm font-medium">Description</h1>
            <TipTapEditor
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Enter your project description"
              height="h-40"
              showToolbar={true}
            />
          </div>

          <div className="flex w-full gap-2">
            <ReqInput
              label="Button Text"
              type="text"
              className="w-full"
              value={formData.btnText}
              placeholder="View my project"
              onChange={(e) => handleChange("btnText", e.target.value)}
            />

            <ReqInput
              label="Button Link"
              type="text"
              className="w-full"
              placeholder="https://reachoout.com"
              value={formData.btnLink}
              onChange={(e) => handleChange("btnLink", e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center md:gap-10 gap-6">
            <ImageInput
              initialImgUrl={formData.imgUrl}
              className="w-full"
              onImageUpload={(imgUrl) => {
                handleChange("imgUrl", imgUrl);
              }}
              onImageRemove={() => handleChange("imgUrl", "")}
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
