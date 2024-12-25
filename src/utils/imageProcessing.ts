export const loadImage = (imageUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Verify image dimensions
      if (img.width === 0 || img.height === 0) {
        reject(new Error('Invalid image dimensions'));
        return;
      }
      resolve(img);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
    
    // Set a timeout for image loading
    setTimeout(() => {
      if (!img.complete) {
        reject(new Error('Image loading timeout'));
      }
    }, 10000); // 10 second timeout
  });
};

export const validateImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please upload an image file'));
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
};