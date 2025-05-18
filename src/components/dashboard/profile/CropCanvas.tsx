
import { useRef, useEffect } from 'react';
import { drawCropCanvas } from './utils/canvasUtils';

interface CropCanvasProps {
  imageSrc: string;
  cropArea: { x: number; y: number; width: number; height: number };
  scale: number;
  onMouseDown: (x: number, y: number) => void;
  onMouseMove: (x: number, y: number) => void;
  onMouseUp: () => void;
  onImageLoaded?: (img: HTMLImageElement) => void;
  imageRef: React.RefObject<HTMLImageElement>;
}

const CropCanvas = ({
  imageSrc,
  cropArea,
  scale,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onImageLoaded,
  imageRef
}: CropCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw the canvas when cropArea or scale changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    
    if (canvas && img && img.complete) {
      drawCropCanvas(canvas, img, cropArea, scale);
    }
  }, [cropArea, scale, imageRef]);
  
  // Initialize image
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;
    
    const handleLoad = () => {
      if (onImageLoaded) {
        onImageLoaded(img);
      }
      
      const canvas = canvasRef.current;
      if (canvas) {
        drawCropCanvas(canvas, img, cropArea, scale);
      }
    };
    
    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
    }
  }, [imageSrc, onImageLoaded, cropArea, scale, imageRef]);
  
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Convert mouse position to canvas coordinates
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;
    
    onMouseDown(x, y);
  };
  
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Convert mouse position to canvas coordinates
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;
    
    onMouseMove(x, y);
  };
  
  return (
    <>
      <img
        ref={imageRef}
        src={imageSrc}
        alt="Original"
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-move"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        width={800}
        height={600}
      />
    </>
  );
};

export default CropCanvas;
