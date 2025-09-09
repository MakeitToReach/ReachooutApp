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
import { FFAQ_ITEM } from "../types/faq.types";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface FAddFaqPopupProps {
    children: React.ReactNode;
    onAdd: (faq: FFAQ_ITEM) => void;
}
export function FAddFaqPopup({ children, onAdd }: FAddFaqPopupProps) {
    const [item, setItem] = useState<FFAQ_ITEM>({
        question: "",
        answer: "",
    });
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[40vw] max-h-[90vh] font-Poppins"
            >
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Add Faq</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <ReqInput
                        type="text"
                        label="Question"
                        placeholder="Enter your faq question"
                        value={item.question}
                        onChange={(e) => setItem({ ...item, question: e.target.value })}
                    />

                    <div className="space-y-2">
                        <Label>Answer</Label>
                        <TipTapEditor
                            value={item.answer}
                            onChange={(value) => setItem({ ...item, answer: value })}
                            placeholder="Enter service description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(item);
                                setItem({
                                    question: "",
                                    answer: "",
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

interface FEditFaqPopupProps {
    faq: FFAQ_ITEM;
    faqIdx?: number;
    onSave: (updated: FFAQ_ITEM) => void;
    children: React.ReactNode;
}

export const FEditFaqPopup = ({
    faq,
    faqIdx,
    onSave,
    children,
}: FEditFaqPopupProps) => {
    const [formData, setFormData] = useState<FFAQ_ITEM>(faq);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(faq); // reset on open
    }, [open, faq]);

    const handleChange = (key: keyof FFAQ_ITEM, val: string) => {
        setFormData((prev) => ({ ...prev, [key]: val }));
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-4 sm:max-w-[40vw] max-h-[90vh] font-Poppins">
                <DialogHeader>
                    <DialogTitle className="sm:text-2xl">
                        Edit Faq {faqIdx !== undefined && `#${faqIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <ReqInput
                        type="text"
                        label="Title"
                        value={formData.question}
                        onChange={(e) => handleChange("question", e.target.value)}
                    />

                    <div className="space-y-2">
                        <Label>Answer</Label>
                        <TipTapEditor
                            value={formData.answer}
                            onChange={(value) => handleChange("answer", value)}
                            placeholder="Enter service description"
                            height="h-36"
                            showToolbar={true}
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
