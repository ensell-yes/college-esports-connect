
/**
 * Utility functions for canvas operations in the image cropper
 */

/**
 * Draws the image and crop overlay on the canvas
 */
export const drawCropCanvas = (
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  cropArea: { x: number; y: number; width: number; height: number },
  scale: number
) => {
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
};

/**
 * Creates a cropped image from the original image and crop area
 */
export const createCroppedImage = (
  img: HTMLImageElement,
  cropArea: { x: number; y: number; width: number; height: number }
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Create a new canvas for the cropped image
    const croppedCanvas = document.createElement('canvas');
    
    // Set the dimensions based on the crop area
    croppedCanvas.width = img.naturalWidth * cropArea.width;
    croppedCanvas.height = img.naturalHeight * cropArea.height;
    
    const ctx = croppedCanvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    
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
        resolve(blob);
      } else {
        reject(new Error('Failed to create blob'));
      }
    }, 'image/jpeg', 0.9);
  });
};
