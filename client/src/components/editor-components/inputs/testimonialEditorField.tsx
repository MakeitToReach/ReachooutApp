import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { PF_TESTIMONIAL } from "@/templates/professional/types/testimonials.types";
import { AddTestimonialPopup, EditTestimonialPopup } from "../popups/testimonialsPopup";

interface TestimonialEditorFieldProps {
    value: PF_TESTIMONIAL[];
    onChange: (val: PF_TESTIMONIAL[]) => void;
}
export const TestimonialEditorField = ({
    value,
    onChange,
}: TestimonialEditorFieldProps) => {
    const handleAdd = (newTestimonial: PF_TESTIMONIAL) => {
        onChange([...value, newTestimonial]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newTestimonial: PF_TESTIMONIAL) => {
        const updated = [...value];
        updated[index] = newTestimonial;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Testimonials</h1>
                <AddTestimonialPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </AddTestimonialPopup>
            </div>
            {value.map((testimonial, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Testimonial {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <EditTestimonialPopup
                            onSave={(newTestimonial) => handleEdit(index, newTestimonial)}
                            testimonial={testimonial}
                            testimonialIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </EditTestimonialPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
