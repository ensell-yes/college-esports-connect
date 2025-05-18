
import { useState, useEffect } from 'react';

interface UseCropAreaProps {
  aspectRatio?: number;
}

export const useCropArea = ({ aspectRatio }: UseCropAreaProps) => {
  const [cropArea, setCropArea] = useState({ x: 0.1, y: 0.1, width: 0.8, height: 0.8 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  
  // Calculate the crop height based on aspect ratio and width
  useEffect(() => {
    if (aspectRatio) {
      const newHeight = cropArea.width / aspectRatio;
      setCropArea(prev => ({ ...prev, height: newHeight }));
    }
  }, [aspectRatio, cropArea.width]);

  const resetCropArea = () => {
    setCropArea({ x: 0.1, y: 0.1, width: 0.8, height: 0.8 });
  };
  
  const initializeCropArea = (imgWidth: number, imgHeight: number) => {
    if (!aspectRatio) return;
    
    const imgAspectRatio = imgWidth / imgHeight;
    const targetAspectRatio = aspectRatio;
    
    let width = 0.8;
    let height = 0.8;
    let x = 0.1;
    let y = 0.1;
    
    if (imgAspectRatio > targetAspectRatio) {
      // Image is wider than target aspect ratio
      width = targetAspectRatio * (height * imgHeight) / imgWidth;
      x = (1 - width) / 2;
    } else {
      // Image is taller than target aspect ratio
      height = (width * imgWidth) / (targetAspectRatio * imgHeight);
      y = (1 - height) / 2;
    }
    
    setCropArea({ x, y, width, height });
  };
  
  const handleMouseDown = (x: number, y: number) => {
    setIsDragging(true);
    setDragStartPos({ x, y });
  };
  
  const handleMouseMove = (x: number, y: number) => {
    if (!isDragging) return;
    
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
  
  return {
    cropArea,
    isDragging,
    resetCropArea,
    initializeCropArea,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};
