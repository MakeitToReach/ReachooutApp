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
import { F_BLOG } from "../types/blogs.types";
import { ImageVideoInput } from "@/components/editor-components/inputs/ImageVideoInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";
import { Label } from "@/components/ui/label";

interface FAddBlogPopupProps {
  children: React.ReactNode;
  onAdd: (blog: F_BLOG) => void;
}
export function FAddBlogPopup({ children, onAdd }: FAddBlogPopupProps) {
  const [blog, setBlog] = useState<F_BLOG>({
    title: "",
    description: "",
    imgUrl: "",
    vidUrl: "",
    btnLink: "",
    btnText: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Blog</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ImageVideoInput
            initialImgUrl={blog.imgUrl}
            initialVideoUrl={blog.vidUrl}
            onImageUpload={(imgUrl) => {
              setBlog({ ...blog, imgUrl: imgUrl });
            }}
            onImageRemove={() => setBlog({ ...blog, imgUrl: "" })}
            onVideoUrlChange={(vidUrl) => {
              setBlog({ ...blog, vidUrl: vidUrl });
            }}
            className="w-full"
          />
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter title"
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />

          <div>
            <Label>Description</Label>
            <TipTapEditor
              value={blog.description}
              onChange={(value) => setBlog({ ...blog, description: value })}
              placeholder="Enter service description"
              height="h-36"
              showToolbar={true}
            />
          </div>

          <div className="flex gap-2 w-full">
            <ReqInput
              type="text"
              label="Button Text"
              className="w-full"
              placeholder="Enter button text"
              onChange={(e) => setBlog({ ...blog, btnText: e.target.value })}
            />
            <ReqInput
              type="text"
              label="Button Link"
              className="w-full"
              placeholder="Enter button link"
              onChange={(e) => setBlog({ ...blog, btnLink: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(blog);
                setBlog({
                  title: "",
                  description: "",
                  imgUrl: "",
                  vidUrl: "",
                  btnLink: "",
                  btnText: "",
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

interface FEditBlogPopupProps {
  blog: F_BLOG;
  blogIdx?: number;
  onSave: (updated: F_BLOG) => void;
  children: React.ReactNode;
}

export const FEditBlogPopup = ({
  blog,
  blogIdx,
  onSave,
  children,
}: FEditBlogPopupProps) => {
  const [formData, setFormData] = useState<F_BLOG>(blog);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(blog); // reset on open
  }, [open, blog]);

  const handleChange = (key: keyof F_BLOG, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl">
            Edit Blog {blogIdx !== undefined && `#${blogIdx + 1}`}
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
            className="w-full"
          />

          <ReqInput
            type="text"
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <div>
            <Label>Description</Label>
            <TipTapEditor
              value={blog.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Enter service description"
              height="h-36"
              showToolbar={true}
            />
          </div>

          <div className="flex gap-2 w-full items-center">
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
