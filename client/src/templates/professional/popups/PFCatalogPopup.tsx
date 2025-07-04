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
import { Textarea } from "@/components/ui/textarea";

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
        imgUrls: ["https://placehold.co/500"],
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
                    <DialogTitle className="md:text-2xl">Add Project</DialogTitle>
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
                        <label className="font-semibold">Description</label>
                        <textarea
                            placeholder="Description"
                            className="border p-2 w-full rounded-md h-20"
                            value={item.description}
                            onChange={(e) =>
                                setItem({ ...item, description: e.target.value })
                            }
                        />
                    </div>

                    <div className="flex gap-2">
                        <ReqInput
                            label="Button Text"
                            type="text"
                            placeholder="View my project"
                            value={item.btnText}
                            onChange={(e) => setItem({ ...item, btnText: e.target.value })}
                        />

                        <ReqInput
                            label="Button Link"
                            type="text"
                            placeholder="https://reachoout.com"
                            value={item.btnLink}
                            onChange={(e) => setItem({ ...item, btnLink: e.target.value })}
                        />
                    </div>
                    {/* TODO:add multi image input here */}
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
                                    imgUrls: ["https://placehold.co/500"],
                                    category: "",
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
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-4 z-[100] font-Poppins">
                <DialogHeader>
                    <DialogTitle>
                        Edit Catalog {itemIdx !== undefined && `#${itemIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <ReqInput
                        required={true}
                        type="text"
                        label="Title"
                        placeholder="Enter your catalog title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                    <ReqInput
                        required={true}
                        type="text"
                        label="Category Tag"
                        placeholder="Enter your catalog category"
                        value={formData.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    />

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Description"
                            className="border p-2 w-full rounded-md h-20"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>
                    {/* <ReqInput */}
                    {/*     required={true} */}
                    {/*     type="text" */}
                    {/*     label="Description" */}
                    {/*     placeholder="Enter your catalog description" */}
                    {/*     value={formData.description} */}
                    {/*     onChange={(e) => handleChange("description", e.target.value)} */}
                    {/* /> */}

                    {/* TODO: image or vid url input here */}
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
