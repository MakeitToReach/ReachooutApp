import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";
import { useIsMobile } from "@/hooks/use-mobile";

interface QRCodePopupProps {
  value: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const QRCodePopup: React.FC<QRCodePopupProps> = ({
  value,
  children,
  open,
  onOpenChange,
}) => {
  const isMobile = useIsMobile();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only hidden">Portfolio QR Code</DialogTitle>
        <div className="flex flex-col items-center justify-center py-4">
          <QRCodeCanvas value={value} size={isMobile ? 200 : 300} />
          {/* <p className="mt-4 text-xs break-all text-center">{value}</p> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodePopup;
