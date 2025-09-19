"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DeleteAlertPopupProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onConfirm: () => void;
    type: "project" | "reachpage"
}

export function DeleteAlertPopup({
    children,
    open,
    onOpenChange,
    onConfirm,
    type
}: DeleteAlertPopupProps) {
    const [value, setValue] = useState("");

    const canConfirm = value.trim().toLowerCase() === `delete`;

    // Reset input value when dialog closes
    useEffect(() => {
        if (!open) {
            setValue("");
        }
    }, [open]);

    const handleConfirm = () => {
        if (!canConfirm) return;
        onConfirm();
        setValue("");
        // Small delay to ensure state is updated before closing
        setTimeout(() => {
            onOpenChange?.(false);
        }, 0);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">Confirm Deletion</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        This action cannot be undone. To confirm, type
                        <span className="mx-1 font-semibold">delete</span>
                        below.
                    </p>
                    <Input
                        placeholder="delete"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        aria-label="delete confirmation input"
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" disabled={!canConfirm} onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


