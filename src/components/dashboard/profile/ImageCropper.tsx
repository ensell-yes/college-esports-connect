
import { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Crop, RotateCcw } from "lucide-react";
import { useCropArea } from './hooks/useCropArea';
import { createCroppedImage } from './utils/canvasUtils';
import CropCanvas from './CropCanvas';

interface ImageCropperProps {
  image: string;
  aspectRatio?: number;
  onCropComplete: (croppedImage: Blob) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ImageCropper = ({
  image,
  aspectRatio = 1,
  onCropComplete,
  isOpen,
  onClose
}: ImageCropperProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const { 
    cropArea, 
    resetCropArea, 
    initializeCropArea,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = useCropArea({ aspectRatio });
  
  const handleImageLoaded = useCallback((img: HTMLImageElement) => {
    initializeCropArea(img.naturalWidth, img.naturalHeight);
  }, [initializeCropArea]);
  
  const handleCropComplete = useCallback(async () => {
    const img = imageRef.current;
    if (!img) return;
    
    try {
      const croppedBlob = await createCroppedImage(img, cropArea);
      onCropComplete(croppedBlob);
      onClose();
    } catch (error) {
      console.error('Error creating cropped image:', error);
    }
  }, [cropArea, onCropComplete, onClose]);
  
  const handleReset = () => {
    resetCropArea();
    setScale(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 mt-4">
          <div className="relative w-full bg-black rounded-md overflow-hidden" 
               style={{ height: '60vh', maxHeight: '600px' }}>
            <CropCanvas 
              imageSrc={image}
              cropArea={cropArea}
              scale={scale}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onImageLoaded={handleImageLoaded}
              imageRef={imageRef}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="zoom" className="w-20">Zoom:</Label>
              <Slider
                id="zoom"
                value={[scale]}
                min={0.5}
                max={3}
                step={0.01}
                onValueChange={(value) => setScale(value[0])}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="flex justify-between space-x-2 mt-4">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleCropComplete}>
                <Crop className="mr-2 h-4 w-4" />
                Apply Crop
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
