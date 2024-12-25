import { useState } from 'react';
import { validateImage } from '../utils/imageProcessing';

export const useImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    
    if (!file) return;
    
    try {
      const validatedImage = await validateImage(file);
      setImage(validatedImage);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload image');
      setImage(null);
    }
  };

  return { image, error, handleImageUpload };
};