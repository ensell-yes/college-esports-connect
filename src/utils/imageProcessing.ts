
/**
 * Utility functions for processing images (resize, crop, compress)
 */

/**
 * Resize and compress an image to ensure it's under the maximum file size
 * @param file The image file to process
 * @param maxWidth Maximum width of the image
 * @param maxHeight Maximum height of the image
 * @param quality Compression quality (0-1)
 * @param maxSizeInMB Maximum file size in MB
 * @returns A Promise resolving to a processed Blob
 */
export const processImage = async (
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8,
  maxSizeInMB = 2
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with compression
        let currentQuality = quality;
        
        // First attempt with initial quality
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }
            
            // Check if the blob size is larger than max size
            if (blob.size > maxSizeInMB * 1024 * 1024) {
              // If so, reduce quality iteratively until it's below the limit
              let attempts = 0;
              let processedBlob = blob;
              
              while (processedBlob.size > maxSizeInMB * 1024 * 1024 && attempts < 5) {
                attempts++;
                currentQuality -= 0.1;
                
                if (currentQuality <= 0.1) {
                  currentQuality = 0.1; // Don't go below 0.1 quality
                  break;
                }
                
                processedBlob = await new Promise<Blob>((resolveBlob) => {
                  canvas.toBlob(
                    (newBlob) => {
                      resolveBlob(newBlob || blob);
                    },
                    file.type,
                    currentQuality
                  );
                });
              }
              
              console.log(`Final image size: ${(processedBlob.size / (1024 * 1024)).toFixed(2)}MB with quality: ${currentQuality}`);
              resolve(processedBlob);
            } else {
              console.log(`Image size: ${(blob.size / (1024 * 1024)).toFixed(2)}MB with quality: ${quality}`);
              resolve(blob);
            }
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
};

/**
 * Crop an image based on provided crop area
 * @param file The image file to crop
 * @param cropArea Object containing x, y, width, height values (0-1 representing percentages)
 * @returns A Promise resolving to a cropped image Blob
 */
export const cropImage = (
  file: File | Blob,
  cropArea: { x: number; y: number; width: number; height: number }
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Calculate actual pixel values from percentages
        const x = cropArea.x * img.width;
        const y = cropArea.y * img.height;
        const width = cropArea.width * img.width;
        const height = cropArea.height * img.height;
        
        // Create canvas for the cropped image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Draw the cropped portion of the image
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
        
        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          file instanceof File ? file.type : 'image/jpeg',
          0.9
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
};

/**
 * Convert a blob to a data URL
 * @param blob The blob to convert
 * @returns A Promise resolving to a data URL
 */
export const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Convert a data URL to a blob
 * @param dataUrl The data URL to convert
 * @returns A Blob
 */
export const dataURLtoBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};
