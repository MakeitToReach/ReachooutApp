"use client";
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

interface PrivacyPolicyPopupProps {
    children: React.ReactNode;
    content: string;
}

export function PrivacyPolicyPopup({ children, content }: PrivacyPolicyPopupProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[600px] font-Poppins max-h-[90vh] overflow-y-auto"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Privacy Policy</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
                <DialogFooter className="flex gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">
                            I Disagree
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>
                            I Agree
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 