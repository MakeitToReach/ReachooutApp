import {
  Dialog,
  DialogContent,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { motion as m } from "motion/react";

export const ReadMorePopup = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <DialogContent className="z-[100] max-h-[80vh] overflow-y-scroll theme-wrapper">
            <DialogTitle>Read More</DialogTitle>
            {content
              .split(/\n{2,}/)
              .filter((para) => para.trim() !== "")
              .map((para, index) => (
                <p
                  key={index}
                  className="text-black leading-relaxed mb-4 whitespace-pre-line"
                >
                  {para.trim()}
                </p>
              ))}
          </DialogContent>
        </m.div>
      </Dialog>
    </>
  );
};
