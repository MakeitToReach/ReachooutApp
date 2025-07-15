import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

interface QRCodeModalProps {
  open: boolean;
  onClose: () => void;
  value: string;
  // Removed onClick prop; event handling is now internal
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ open, onClose, value }) => {
  const isMobile = useIsMobile();
  const qrRef = React.useRef<HTMLCanvasElement>(null);
  if (!open) return null;

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.png";
      link.click();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-black/20 backdrop-blur-xs"
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close"
      >
        <X className="size-8 text-white" />
      </button>
      <div className="relative bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <QRCodeCanvas ref={qrRef} value={value} size={isMobile ? 200 : 300} />
        <p className="mt-4 text-xs break-all text-center text-gray-700">
          {value}
        </p>
        <Button
          variant="secondary"
          onClick={handleDownload}
          className="mt-4 w-full"
        >
          Download QR Code
        </Button>
      </div>
    </div>
  );
};

export default QRCodeModal;
