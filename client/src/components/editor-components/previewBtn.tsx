import { SquareArrowOutUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PreviewButtonProps {
    previewUrl: string;
}
export default function PreviewButton({ previewUrl }: PreviewButtonProps) {
    return (
        <Link href={previewUrl}>
            <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
                <Button
                    className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
                    variant="outline"
                >
                    Preview
                </Button>
                <Button
                    className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
                    variant="outline"
                    size="icon"
                    aria-label="Open link"
                >
                    <SquareArrowOutUpRightIcon size={16} aria-hidden="true" />
                </Button>
            </div>
        </Link>
    );
}
