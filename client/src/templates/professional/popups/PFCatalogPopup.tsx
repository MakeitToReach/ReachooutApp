import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { PF_CATALOG } from "../types/serviceCatalog.types";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { Label } from "@/components/ui/label";
import { MultipleImageInput } from "@/components/multiImgInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface PFAddCatalogPopupProps {
  children: React.ReactNode;
  onAdd: (service: PF_CATALOG) => void;
}
export function PFAddCatalogPopup({ children, onAdd }: PFAddCatalogPopupProps) {
  // const { addProject } = usePortfolioStore();
  const [item, setItem] = useState<PF_CATALOG>({
    title: "",
    description: "",
    btnText: "",
    btnLink: "",
    imgUrls: [],
    category: "",
    vidUrl: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Catalog</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter your title"
            value={item.title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />

          <ReqInput
            label="Category Tag"
            type="text"
            placeholder="Enter your service category"
            value={item.category}
            onChange={(e) => setItem({ ...item, category: e.target.value })}
          />

          <div>
            <Label>Description</Label>
            <TipTapEditor
              value={item.description}
              onChange={(value) => setItem({ ...item, description: value })}
              placeholder="Description"
              height="h-36"
              showToolbar={true}
            />
          </div>

          <div className="flex gap-2 w-full">
            <ReqInput
              label="Button Text"
              type="text"
              className="w-full"
              placeholder="View my project"
              value={item.btnText}
              onChange={(e) => setItem({ ...item, btnText: e.target.value })}
            />

            <ReqInput
              label="Button Link"
              type="text"
              className="w-full"
              placeholder="https://reachoout.com"
              value={item.btnLink}
              onChange={(e) => setItem({ ...item, btnLink: e.target.value })}
            />
          </div>
          <Label>Images</Label>
          <div className="flex flex-col md:gap-6 gap-6 w-full">
            <MultipleImageInput
              onImageAdd={(imgUrl) => {
                setItem((prev) => ({
                  ...prev,
                  imgUrls: [...prev.imgUrls, imgUrl],
                }));
              }}
              onImageRemove={(index) => {
                setItem((prev) => ({
                  ...prev,
                  imgUrls: prev.imgUrls.filter((_, i) => i !== index),
                }));
              }}
            />
            <h2 className="text-sm font-semibold text-center">OR</h2>
            <ReqInput
              className="w-full"
              label="Video URL"
              type="text"
              placeholder="https://youtube.com/watch?v=******"
              value={item.vidUrl}
              onChange={(e) => setItem({ ...item, vidUrl: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(item);
                setItem({
                  title: "",
                  description: "",
                  btnText: "",
                  btnLink: "",
                  imgUrls: [],
                  category: "",
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

interface PFEditCatalogPopupProps {
  item: PF_CATALOG;
  itemIdx?: number; // optional, for display/debug
  onSave: (updated: PF_CATALOG) => void;
  children: React.ReactNode;
}

export const PFEditCatalogPopup = ({
  item,
  itemIdx,
  onSave,
  children,
}: PFEditCatalogPopupProps) => {
  const [formData, setFormData] = useState<PF_CATALOG>(item);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(item); // reset on open
  }, [open, item]);

  const handleChange = (key: keyof PF_CATALOG, val: string) => {
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
        className="sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="md:text-2xl">
            Edit Catalog {itemIdx !== undefined && `#${itemIdx + 1}`}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ReqInput
            type="text"
            label="Title"
            placeholder="Enter your catalog title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <ReqInput
            label="Category Tag"
            type="text"
            placeholder="Enter your catalog category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />

          <div>
            <Label>Description</Label>
            <TipTapEditor
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Description"
              height="h-36"
              showToolbar={true}
            />
          </div>

          <div className="flex gap-2 w-full">
            <ReqInput
              label="Button Text"
              type="text"
              className="w-full"
              placeholder="View my project"
              value={formData.btnText}
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

          <Label>Images</Label>
          <div className="flex flex-col md:gap-6 gap-6 w-full">
            <MultipleImageInput
              initialImages={formData.imgUrls}
              onImageAdd={(imgUrl) => {
                setFormData((prev) => ({
                  ...prev,
                  imgUrls: [...prev.imgUrls, imgUrl],
                }));
              }}
              onImageRemove={(index) => {
                setFormData((prev) => ({
                  ...prev,
                  imgUrls: prev.imgUrls.filter((_, i) => i !== index),
                }));
              }}
            />
            <h2 className="text-sm font-semibold text-center">OR</h2>
            <ReqInput
              className="w-full"
              label="Video URL"
              type="text"
              placeholder="https://youtube.com/watch?v=******"
              value={formData.vidUrl}
              onChange={(e) => handleChange("vidUrl", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
