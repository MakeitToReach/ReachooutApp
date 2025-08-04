import { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";

export interface CropOptions {
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface CropModalProps {
  file: File;
  cropOptions?: CropOptions;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
}

export const CropModal = ({ 
  file, 
  cropOptions = {
    aspectRatio: 1,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 2000,
    maxHeight: 2000
  }, 
  onCropComplete, 
  onCancel 
}: CropModalProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);

  const getCroppedImg = async (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, file.type);
    });
  };

  const handleCrop = async () => {
    if (imageRef.current && completedCrop && completedCrop.width && completedCrop.height) {
      try {
        const croppedBlob = await getCroppedImg(imageRef.current, completedCrop);
        onCropComplete(croppedBlob);
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  };

  const handleRotate = (direction: 'left' | 'right') => {
    setRotation(prev => prev + (direction === 'left' ? -90 : 90));
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prev => {
      const newScale = direction === 'in' ? prev * 1.1 : prev / 1.1;
      return Math.max(0.5, Math.min(3, newScale));
    });
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:min-w-7xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription>
            Adjust the crop area to your desired size. Use the controls below to rotate and zoom.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 w-full">
          {/* Controls */}
          <div className="flex items-center justify-start gap-4 p-4 bg-muted rounded-lg">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate('left')}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Rotate Left
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate('right')}
              className="flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              Rotate Right
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom('out')}
              className="flex items-center gap-2"
            >
              <ZoomOut className="w-4 h-4" />
              Zoom Out
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom('in')}
              className="flex items-center gap-2"
            >
              <ZoomIn className="w-4 h-4" />
              Zoom In
            </Button>
          </div>

          {/* Crop Area */}
          <div className="flex sm:justify-center justify-start overflow-auto max-h-96 w-full">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={cropOptions.aspectRatio}
              minWidth={cropOptions.minWidth}
              minHeight={cropOptions.minHeight}
              maxWidth={cropOptions.maxWidth}
              maxHeight={cropOptions.maxHeight}
            >
              <img
                ref={imageRef}
                src={URL.createObjectURL(file)}
                alt="Crop preview"
                style={{
                  transform: `rotate(${rotation}deg) scale(${scale})`,
                  maxHeight: '300px',
                  objectFit: 'contain'
                }}
              />
            </ReactCrop>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleCrop}
              disabled={!completedCrop || !completedCrop.width || !completedCrop.height}
            >
              Apply Crop
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 