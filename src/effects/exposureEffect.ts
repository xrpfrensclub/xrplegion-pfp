import type { EffectSettings } from '../types/effects';

export function drawExposureEffect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  settings: EffectSettings
) {
  // Ensure valid alpha values
  const redOverlayAlpha = Math.max(0, Math.min(settings.redOverlay, 100)) / 100 * 0.5;
  const exposureIntensity = Math.max(0, Math.min(settings.exposure, 100)) / 100;

  // Strong red base overlay
  ctx.fillStyle = `rgba(255, 0, 0, ${redOverlayAlpha})`;
  ctx.fillRect(x, y, width, height);

  // Center points for gradients
  const centerX = width / 2 + x;
  const centerY = height / 2 + y;
  const radius = width * 0.8;

  // Intense exposure effect
  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, radius
  );
  
  gradient.addColorStop(0, `rgba(255, 255, 255, ${exposureIntensity * 0.4})`);
  gradient.addColorStop(0.3, `rgba(255, 0, 0, ${exposureIntensity * 0.3})`);
  gradient.addColorStop(0.7, `rgba(255, 0, 0, ${exposureIntensity * 0.2})`);
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);

  // Add vignette effect
  const vignette = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, radius
  );
  
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(0.7, `rgba(0, 0, 0, ${exposureIntensity * 0.4})`);
  vignette.addColorStop(1, `rgba(0, 0, 0, ${exposureIntensity * 0.7})`);

  ctx.fillStyle = vignette;
  ctx.fillRect(x, y, width, height);
}