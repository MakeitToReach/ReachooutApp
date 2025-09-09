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
import { ReqInput } from "../inputs/reqInput";
import { Button } from "@/components/ui/button";
import { PF_TESTIMONIAL } from "@/templates/professional/types/testimonials.types";
import { ImageInput } from "@/components/imgInput";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddTestimonialPopupProps {
    children: React.ReactNode;
    onAdd: (testimonial: PF_TESTIMONIAL) => void;
}
export function AddTestimonialPopup({
    children,
    onAdd,
}: AddTestimonialPopupProps) {
    const [testimonial, setTestimonial] = useState<PF_TESTIMONIAL>({
        name: "",
        body: "",
        img: "",
    });
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[40vw] max-h-[90vh] font-Poppins"
            >
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Add Testimonial</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <ReqInput
                        type="text"
                        label="Client Name"
                        placeholder="Enter Name of the client"
                        value={testimonial.name}
                        onChange={(e) =>
                            setTestimonial({ ...testimonial, name: e.target.value })
                        }
                    />


                    <div>
                        <label className="font-semibold">Message</label>
                        <Textarea
                            placeholder="Message"
                            className="border p-2 w-full rounded-md h-20"
                            value={testimonial.body}
                            onChange={(e) =>
                                setTestimonial({ ...testimonial, body: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="font-semibold">Client Image</Label>
                        <ImageInput
                            initialImgUrl={testimonial.img}
                            className="w-full"
                            onImageUpload={(imgUrl) => {
                                setTestimonial({ ...testimonial, img: imgUrl });
                            }}
                            onImageRemove={() => setTestimonial({ ...testimonial, img: "" })}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(testimonial);
                                setTestimonial({
                                    name: "",
                                    body: "",
                                    img: "",
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

interface EditTestimonialPopupProps {
    testimonial: PF_TESTIMONIAL;
    testimonialIdx?: number;
    onSave: (updated: PF_TESTIMONIAL) => void;
    children: React.ReactNode;
}

export const EditTestimonialPopup = ({
    testimonial,
    testimonialIdx,
    onSave,
    children,
}: EditTestimonialPopupProps) => {
    const [formData, setFormData] = useState<PF_TESTIMONIAL>(testimonial);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(testimonial); // reset on open
    }, [open, testimonial]);

    const handleChange = (key: keyof PF_TESTIMONIAL, val: string) => {
        setFormData((prev) => ({ ...prev, [key]: val }));
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-4 sm:max-w-[40vw] font-Poppins">
                <DialogHeader>
                    <DialogTitle className="sm:text-2xl">
                        Edit Testimonial{" "}
                        {testimonialIdx !== undefined && `#${testimonialIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <ReqInput
                        title="Name"
                        label="Name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <div>
                        <label className="font-semibold">Message</label>
                        <Textarea
                            placeholder="Message"
                            className="border p-2 w-full rounded-md h-20"
                            value={formData.body}
                            onChange={(e) => handleChange("body", e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-semibold">Client Image</Label>
                    <ImageInput
                        initialImgUrl={formData.img}
                        className="w-full"
                        onImageUpload={(imgUrl) => {
                            handleChange("img", imgUrl);
                        }}
                        onImageRemove={() => handleChange("img", "")}
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
