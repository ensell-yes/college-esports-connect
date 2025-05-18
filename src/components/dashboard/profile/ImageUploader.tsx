
import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { processImage } from "@/utils/imageProcessing";
import ImageCropper from "./ImageCropper";

interface ImageUploaderProps {
  onImageSelected: (imageBlob: Blob) => void;
  aspectRatio?: number;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost";
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  className?: string;
  accept?: string;
  maxSizeInMB?: number;
}

const ImageUploader = ({
  onImageSelected,
  aspectRatio,
  buttonVariant = "outline",
  buttonText = "Upload Image",
  buttonIcon = <Upload className="mr-2 h-4 w-4" />,
  className = "",
  accept = "image/jpeg, image/png, image/gif, image/webp",
  maxSizeInMB = 2
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    
    // Validate file size (before processing)
    if (file.size > maxSizeInMB * 2 * 1024 * 1024) {
      toast.error(`Image is too large (max ${maxSizeInMB * 2}MB). Please select a smaller image.`);
      return;
    }
    
    try {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setSelectedImage(objectUrl);
      setIsCropperOpen(true);
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to process image');
      console.error('Error processing image:', error);
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    try {
      // Process image (resize and compress) after cropping
      const processedBlob = await processImage(
        new File([croppedBlob], "cropped_image.jpg", { type: croppedBlob.type }),
        2048, // max width
        2048, // max height
        0.8,  // initial quality
        maxSizeInMB
      );
      
      // Pass the processed image back
      onImageSelected(processedBlob);
      
      // Cleanup
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
      
      setSelectedImage(null);
    } catch (error) {
      toast.error('Failed to process cropped image');
      console.error('Error processing cropped image:', error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCropperClose = () => {
    setIsCropperOpen(false);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <>
      <Button 
        variant={buttonVariant} 
        onClick={triggerFileInput} 
        className={className}
        type="button"
      >
        {buttonIcon}
        {buttonText}
      </Button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        style={{ display: 'none' }}
      />
      
      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          aspectRatio={aspectRatio}
          onCropComplete={handleCropComplete}
          isOpen={isCropperOpen}
          onClose={handleCropperClose}
        />
      )}
    </>
  );
};

export default ImageUploader;
