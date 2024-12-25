import { useCallback } from 'react';
import type { EyePositions } from '../services/faceDetection/types';
import type { EffectSettings } from '../types/effects';
import { drawLaserBeam } from '../effects/laserBeam';
import { drawEyeGlow } from '../effects/eyeGlow';
import { drawExposureEffect } from '../effects/exposureEffect';
import { drawWatermark } from '../effects/watermark';
import { calculateAspectRatio } from '../utils/imageUtils';

const XRPL_LOGO_URL = 'https://i.ibb.co/Bf2y8sF/xrplogo.png';

export const useLaserEffect = () => {
  const applyLaserEffect = useCallback((
    canvas: HTMLCanvasElement,
    imageUrl: string,
    eyePositions: EyePositions,
    settings: EffectSettings
  ) => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // Calculate dimensions maintaining aspect ratio
      const { width, height, x, y } = calculateAspectRatio(
        img.width,
        img.height,
        canvas.width,
        canvas.height
      );
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scale eye positions
      const scaleX = width / img.width;
      const scaleY = height / img.height;
      const leftEyeX = eyePositions.leftEye.x * scaleX + x;
      const leftEyeY = eyePositions.leftEye.y * scaleY + y;
      const rightEyeX = eyePositions.rightEye.x * scaleX + x;
      const rightEyeY = eyePositions.rightEye.y * scaleY + y;

      // Draw laser beams first
      drawLaserBeam(ctx, leftEyeX, leftEyeY, settings);
      drawLaserBeam(ctx, rightEyeX, rightEyeY, settings);
      
      // Draw base image
      ctx.drawImage(img, x, y, width, height);

      // Apply exposure effect
      drawExposureEffect(ctx, x, y, width, height, settings);

      // Draw eye glows on top
      drawEyeGlow(ctx, leftEyeX, leftEyeY, settings);
      drawEyeGlow(ctx, rightEyeX, rightEyeY, settings);

      // Draw logo
      const logo = new Image();
      logo.crossOrigin = 'anonymous';
      logo.src = XRPL_LOGO_URL;
      
      logo.onload = () => {
        const logoSize = width * (settings.logoSize / 100);
        const logoOpacity = settings.logoOpacity / 100;
        
        ctx.save();
        ctx.globalAlpha = logoOpacity;
        
        const padding = width * 0.05;
        ctx.drawImage(
          logo,
          x + padding,
          y + padding,
          logoSize,
          logoSize * 0.3
        );
        
        ctx.restore();

        // Draw watermark last
        drawWatermark(ctx, x, y, width, height);
      };
    };
  }, []);

  return { applyLaserEffect };
};