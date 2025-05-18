
import { useState, useRef, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Crop, RotateCcw } from "lucide-react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [cropArea, setCropArea] = useState({ x: 0.1, y: 0.1, width: 0.8, height: 0.8 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  
  // Calculate the crop height based on aspect ratio and width
  useEffect(() => {
    if (aspectRatio) {
      const newHeight = cropArea.width / aspectRatio;
      setCropArea(prev => ({ ...prev, height: newHeight }));
    }
  }, [aspectRatio, cropArea.width]);

  // Draw the image and crop overlay
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    
    if (!canvas || !img || !img.complete) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image with current scale
    const imgWidth = img.naturalWidth * scale;
    const imgHeight = img.naturalHeight * scale;
    
    // Center the image
    const imgX = (canvas.width - imgWidth) / 2;
    const imgY = (canvas.height - imgHeight) / 2;
    
    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    
    // Draw semi-transparent overlay for the area outside crop (80% opacity)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate crop rectangle in pixels
    const cropX = canvas.width * cropArea.x;
    const cropY = canvas.height * cropArea.y;
    const cropWidth = canvas.width * cropArea.width;
    const cropHeight = canvas.height * cropArea.height;
    
    // Clear the crop area (make it transparent)
    ctx.clearRect(cropX, cropY, cropWidth, cropHeight);
    
    // Add a semi-transparent overlay inside the crop area (30% opacity)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(cropX, cropY, cropWidth, cropHeight);
    
    // Draw border around crop area
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropX, cropY, cropWidth, cropHeight);
    
    // Draw handles
    const handleSize = 10;
    ctx.fillStyle = 'white';
    
    // Corner handles
    ctx.fillRect(cropX - handleSize/2, cropY - handleSize/2, handleSize, handleSize);
    ctx.fillRect(cropX + cropWidth - handleSize/2, cropY - handleSize/2, handleSize, handleSize);
    ctx.fillRect(cropX - handleSize/2, cropY + cropHeight - handleSize/2, handleSize, handleSize);
    ctx.fillRect(cropX + cropWidth - handleSize/2, cropY + cropHeight - handleSize/2, handleSize, handleSize);
  }, [cropArea, scale]);

  // Initialize image and canvas
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;
    
    if (img.complete) {
      drawCanvas();
    } else {
      img.onload = () => {
        // Initialize crop area based on image aspect ratio
        const imgAspectRatio = img.naturalWidth / img.naturalHeight;
        const targetAspectRatio = aspectRatio || 1;
        
        let width = 0.8;
        let height = 0.8;
        let x = 0.1;
        let y = 0.1;
        
        if (imgAspectRatio > targetAspectRatio) {
          // Image is wider than target aspect ratio
          width = targetAspectRatio * (height * img.naturalHeight) / img.naturalWidth;
          x = (1 - width) / 2;
        } else {
          // Image is taller than target aspect ratio
          height = (width * img.naturalWidth) / (targetAspectRatio * img.naturalHeight);
          y = (1 - height) / 2;
        }
        
        setCropArea({ x, y, width, height });
        drawCanvas();
      };
    }
  }, [image, drawCanvas, aspectRatio]);

  // Update canvas when crop area or scale changes
  useEffect(() => {
    drawCanvas();
  }, [cropArea, scale, drawCanvas]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Convert mouse position to canvas coordinates
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;
    
    setIsDragging(true);
    setDragStartPos({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Convert mouse position to canvas coordinates
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;
    
    // Calculate the movement
    const deltaX = x - dragStartPos.x;
    const deltaY = y - dragStartPos.y;
    
    // Update crop area position
    setCropArea(prev => {
      const newX = Math.max(0, Math.min(1 - prev.width, prev.x + deltaX));
      const newY = Math.max(0, Math.min(1 - prev.height, prev.y + deltaY));
      return { ...prev, x: newX, y: newY };
    });
    
    setDragStartPos({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle crop completion
  const handleCropComplete = useCallback(async () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    
    if (!canvas || !img) return;
    
    // Create a new canvas for the cropped image
    const croppedCanvas = document.createElement('canvas');
    
    // Set the dimensions based on the crop area
    croppedCanvas.width = img.naturalWidth * cropArea.width;
    croppedCanvas.height = img.naturalHeight * cropArea.height;
    
    const ctx = croppedCanvas.getContext('2d');
    if (!ctx) return;
    
    // Draw the cropped portion
    ctx.drawImage(
      img,
      img.naturalWidth * cropArea.x,
      img.naturalHeight * cropArea.y,
      img.naturalWidth * cropArea.width,
      img.naturalHeight * cropArea.height,
      0,
      0,
      croppedCanvas.width,
      croppedCanvas.height
    );
    
    // Convert to blob
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
        onClose();
      }
    }, 'image/jpeg', 0.9);
  }, [cropArea, onCropComplete, onClose]);

  // Reset crop area
  const resetCrop = () => {
    setCropArea({ x: 0.1, y: 0.1, width: 0.8, height: 0.8 });
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
            <img
              ref={imageRef}
              src={image}
              alt="Original"
              className="hidden"
            />
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              width={800}
              height={600}
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
            <Button variant="outline" onClick={resetCrop}>
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

