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
import { F_PROJECT } from "../types/projects.types";
import { ImageVideoInput } from "@/components/editor-components/inputs/ImageVideoInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface FAddProjectPopupProps {
  children: React.ReactNode;
  onAdd: (service: F_PROJECT) => void;
}
export function FAddProjectPopup({ children, onAdd }: FAddProjectPopupProps) {
  const [project, setProject] = useState<F_PROJECT>({
    title: "",
    description: "",
    category: "",
    imgUrl: "",
    vidUrl: "",
    btnText: "",
    btnLink: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[50vw] max-h-[90vh] overflow-y-scroll font-Poppins"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="sm:text-2xl">Add Project</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ImageVideoInput
            initialImgUrl={project.imgUrl}
            initialVideoUrl={project.vidUrl}
            onImageUpload={(imgUrl) => {
              setProject({ ...project, imgUrl: imgUrl });
            }}
            onImageRemove={() => setProject({ ...project, imgUrl: "" })}
            onVideoUrlChange={(vidUrl) => {
              setProject({ ...project, vidUrl: vidUrl });
            }}
            className="w-full"
          />
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter your project title"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />

          <div className="space-y-2">
            <Label>Description</Label>
            <TipTapEditor
              value={project.description}
              onChange={(value) =>
                setProject({ ...project, description: value })
              }
              placeholder="Enter service description"
              height="h-36"
              showToolbar={true}
            />
          </div>

          <ReqInput
            type="text"
            label="Category"
            placeholder="Enter your project category"
            value={project.category}
            onChange={(e) =>
              setProject({ ...project, category: e.target.value })
            }
          />
          <div className="flex gap-2 w-full">
            <ReqInput
              type="text"
              label="Button Text"
              placeholder="Enter your button text"
              value={project.btnText}
              onChange={(e) =>
                setProject({ ...project, btnText: e.target.value })
              }
            />
            <ReqInput
              type="text"
              label="Button Link"
              placeholder="Enter your button link"
              value={project.btnLink}
              onChange={(e) =>
                setProject({ ...project, btnLink: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(project);
                setProject({
                  title: "",
                  description: "",
                  category: "",
                  imgUrl: "",
                  vidUrl: "",
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

interface FEditProjectPopupProps {
  project: F_PROJECT;
  projectIdx?: number;
  onSave: (updated: F_PROJECT) => void;
  children: React.ReactNode;
}

export const FEditProjectPopup = ({
  project,
  projectIdx,
  onSave,
  children,
}: FEditProjectPopupProps) => {
  const [formData, setFormData] = useState<F_PROJECT>(project);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(project); // reset on open
  }, [open, project]);

  const handleChange = (key: keyof F_PROJECT, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[50vw] max-h-[90vh] overflow-y-scroll font-Poppins"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="sm:text-2xl">
            Edit Project {projectIdx !== undefined && `#${projectIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <ImageVideoInput
            initialImgUrl={formData.imgUrl}
            initialVideoUrl={formData.vidUrl}
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
              value={formData.description}
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
