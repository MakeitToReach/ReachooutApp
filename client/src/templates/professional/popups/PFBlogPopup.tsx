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
import { PF_BLOG } from "../types/blog.types";
import { ImageVideoInput } from "@/components/editor-components/inputs/ImageVideoInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";
import { Label } from "@/components/ui/label";

interface PFAddBlogPopupProps {
  children: React.ReactNode;
  onAdd: (member: PF_BLOG) => void;
}
export function PFAddBlogPopup({ children, onAdd }: PFAddBlogPopupProps) {
  const [blog, setBlog] = useState<PF_BLOG>({
    title: "",
    imgUrl: "",
    vidUrl: "",
    description: "",
    btnText: "",
    btnLink: "",
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
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />

          <div>
            <Label>Description</Label>
            <TipTapEditor
              value={blog.description}
              onChange={(value) => setBlog({ ...blog, description: value })}
              placeholder="Enter blog description"
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
              value={blog.btnText}
              onChange={(e) => setBlog({ ...blog, btnText: e.target.value })}
            />

            <ReqInput
              type="text"
              label="Button Link"
              className="w-full"
              placeholder="Enter button link"
              value={blog.btnLink}
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
                  imgUrl: "",
                  vidUrl: "",
                  description: "",
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

interface PFEditBlogPopupProps {
  blog: PF_BLOG;
  blogIdx?: number;
  onSave: (updated: PF_BLOG) => void;
  children: React.ReactNode;
}

export const PFEditBlogPopup = ({
  blog,
  blogIdx,
  onSave,
  children,
}: PFEditBlogPopupProps) => {
  const [formData, setFormData] = useState<PF_BLOG>(blog);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(blog); // reset on open
  }, [open, blog]);

  const handleChange = (key: keyof PF_BLOG, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4 sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl">
            Edit Blog {blogIdx !== undefined && `#${blogIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

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
        <div className="space-y-2">
          <ReqInput
            title="Title"
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <div>
            <Label>Description</Label>
            <TipTapEditor
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Enter blog description"
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
              value={formData.btnText}
              onChange={(e) => handleChange("btnText", e.target.value)}
            />

            <ReqInput
              type="text"
              label="Button Link"
              className="w-full"
              placeholder="Enter button link"
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
