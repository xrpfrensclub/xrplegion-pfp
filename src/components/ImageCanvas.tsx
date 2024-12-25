import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useEyeDetection } from '../hooks/useEyeDetection';
import { useLaserEffect } from '../hooks/useLaserEffect';
import { useDownload } from '../hooks/useDownload';
import { ProcessingOverlay } from './ProcessingOverlay';
import type { EffectSettings } from '../types/effects';

interface ImageCanvasProps {
  image: string | null;
  settings: EffectSettings;
}

export const ImageCanvas: React.FC<ImageCanvasProps> = ({ image, settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { eyePositions, error, isProcessing, detectEyes } = useEyeDetection();
  const { applyLaserEffect } = useLaserEffect();
  const { downloadImage } = useDownload(canvasRef);

  React.useEffect(() => {
    if (image) {
      detectEyes(image);
    }
  }, [image, detectEyes]);

  React.useEffect(() => {
    if (!canvasRef.current || !image || !eyePositions || isProcessing) {
      return;
    }

    applyLaserEffect(canvasRef.current, image, eyePositions, settings);
  }, [image, eyePositions, settings, isProcessing, applyLaserEffect]);

  if (!image) {
    return (
      <div className="w-full aspect-square max-w-[500px] border-4 border-dashed border-red-500/30 rounded-lg flex items-center justify-center bg-gray-900/50">
        <div className="text-center">
          <Upload className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <p className="text-gray-300 legion-font">Upload an image to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[500px]">
      <canvas
        ref={canvasRef}
        className="w-full aspect-square rounded-lg shadow-xl"
        width={500}
        height={500}
      />
      <ProcessingOverlay isVisible={isProcessing} />
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-500/90 backdrop-blur text-white px-4 py-2 rounded-lg text-center legion-font">
          {error}
        </div>
      )}
      <button
        onClick={downloadImage}
        disabled={isProcessing || !!error}
        className="absolute bottom-4 right-4 flex items-center gap-2 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300 font-bold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shake-hover legion-font"
      >
        Download
      </button>
    </div>
  );
};