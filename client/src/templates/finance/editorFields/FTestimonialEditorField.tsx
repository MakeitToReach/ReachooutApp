import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { F_TESTIMONIAL } from "../types/testimonials.types";
import { FAddTestimonialPopup, FEditTestimonialPopup } from "../popups/FTestimonialPopup";

interface FTestimonialEditorFieldProps {
    value: F_TESTIMONIAL[];
    onChange: (val: F_TESTIMONIAL[]) => void;
}

export const FTestimonialEditorField = ({
    value,
    onChange,
}: FTestimonialEditorFieldProps) => {
    const handleAdd = (newTestimonial: F_TESTIMONIAL) => {
        onChange([...value, newTestimonial]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newTestimonial: F_TESTIMONIAL) => {
        const updated = [...value];
        updated[index] = newTestimonial;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Your Testimonials</h1>
                <FAddTestimonialPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add Testimonial{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddTestimonialPopup>
            </div>
            {value.map((testimonial, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Testimonial {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditTestimonialPopup
                            onSave={(newTestimonial) => handleEdit(index, newTestimonial)}
                            testimonial={testimonial}
                            testimonialIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditTestimonialPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
