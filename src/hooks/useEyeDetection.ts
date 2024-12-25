import { useState, useCallback } from 'react';
import { detectFace } from '../services/faceDetection/detector';
import type { EyePositions } from '../services/faceDetection/types';
import { loadImage } from '../utils/imageProcessing';

export function useEyeDetection() {
  const [eyePositions, setEyePositions] = useState<EyePositions | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const detectEyes = useCallback(async (imageUrl: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const img = await loadImage(imageUrl);
      const result = await detectFace(img);

      if (result.error) {
        if (retryCount < 2) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => detectEyes(imageUrl), 1000);
          return;
        }
        throw new Error(result.error);
      }

      if (result.eyes) {
        setEyePositions(result.eyes);
        setRetryCount(0);
      } else {
        throw new Error('Could not detect eyes in the image');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process image');
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 500);
    }
  }, [retryCount]);

  return { eyePositions, error, isProcessing, detectEyes };
}