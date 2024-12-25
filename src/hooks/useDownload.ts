import { RefObject } from 'react';

export const useDownload = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'epic-profile.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return { downloadImage };
};