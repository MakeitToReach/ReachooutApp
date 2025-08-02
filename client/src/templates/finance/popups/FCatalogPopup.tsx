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
import { F_CATLOG_SERVICES } from "../types/service-catalog.types";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultipleImageInput } from "@/components/multiImgInput";

interface FAddCatalogPopupProps {
    children: React.ReactNode;
    onAdd: (service: F_CATLOG_SERVICES) => void;
}
export function FAddCatalogPopup({ children, onAdd }: FAddCatalogPopupProps) {
    const [item, setItem] = useState<F_CATLOG_SERVICES>({
        title: "",
        description: "",
        imgUrls: [],
        category: "",
        vidUrl: "",
    });
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[600px] font-Poppins max-h-[90vh] overflow-y-scroll"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Add Catalog Service</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <ReqInput
                        type="text"
                        label="Title"
                        placeholder="Enter your service title"
                        value={item.title}
                        onChange={(e) => setItem({ ...item, title: e.target.value })}
                    />

                    <ReqInput
                        label="Category"
                        type="text"
                        placeholder="Enter your service category"
                        value={item.category}
                        onChange={(e) => setItem({ ...item, category: e.target.value })}
                    />

                    <div>
                        <label className="font-semibold">Description</label>
                        <Textarea
                            placeholder="Description"
                            className="border p-2 w-full rounded-md h-20"
                            value={item.description}
                            onChange={(e) =>
                                setItem({ ...item, description: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Images</Label>
                        <div className="flex flex-col md:gap-6 gap-6 w-full">
                            <MultipleImageInput
                                onImageAdd={(imgUrl) => {
                                    setItem((prev) => ({ ...prev, imgUrls: [...prev.imgUrls, imgUrl] }));
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
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(item);
                                setItem({
                                    title: "",
                                    description: "",
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

interface FEditCatalogPopupProps {
    item: F_CATLOG_SERVICES;
    itemIdx?: number; // optional, for display/debug
    onSave: (updated: F_CATLOG_SERVICES) => void;
    children: React.ReactNode;
}

export const FEditCatalogPopup = ({
    item,
    itemIdx,
    onSave,
    children,
}: FEditCatalogPopupProps) => {
    const [formData, setFormData] = useState<F_CATLOG_SERVICES>(item);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(item); // reset on open
    }, [open, item]);

    const handleChange = (key: keyof F_CATLOG_SERVICES, val: string) => {
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
                className="sm:max-w-[600px] font-Poppins max-h-[90vh] overflow-y-scroll"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">
                        Edit Catalog Service {itemIdx !== undefined && `#${itemIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <ReqInput
                        required={true}
                        type="text"
                        label="Title"
                        placeholder="Enter your service title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                    <ReqInput
                        required={true}
                        type="text"
                        label="Category"
                        placeholder="Enter your service category"
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

                    <div className="space-y-2">
                        <Label>Images</Label>
                        <div className="flex flex-col md:gap-6 gap-6 w-full">
                            <MultipleImageInput
                                initialImages={formData.imgUrls}
                                onImageAdd={(imgUrl) => {
                                    setFormData((prev) => ({ ...prev, imgUrls: [...prev.imgUrls, imgUrl] }));
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