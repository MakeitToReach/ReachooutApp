import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodePopupProps {
  value: string;
  trigger: React.ReactNode;
}

const QRCodePopup: React.FC<QRCodePopupProps> = ({ value, trigger }) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent>
      <DialogTitle>Portfolio QR Code</DialogTitle>
      <div className="flex flex-col items-center justify-center py-4">
        <QRCodeCanvas value={value} size={200} />
        <p className="mt-4 text-xs break-all text-center">{value}</p>
      </div>
    </DialogContent>
  </Dialog>
);

export default QRCodePopup;
