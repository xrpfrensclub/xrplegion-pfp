import type { EffectSettings } from '../types/effects';

export function drawLaserBeam(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  settings: EffectSettings
) {
  const beamWidth = settings.beamWidth;
  const intensity = settings.glowIntensity;
  const alpha = intensity / 100;
  
  ctx.save();
  
  // Use 'screen' blend mode for better color visibility
  ctx.globalCompositeOperation = 'screen';
  
  // Forward-facing beam effect
  const centerX = startX;
  const centerY = startY;
  const maxRadius = Math.max(ctx.canvas.width, ctx.canvas.height);

  // Create strong turquoise glow
  ctx.shadowColor = '#48EDDD';
  ctx.shadowBlur = 20;

  // Core beam
  const coreGradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, maxRadius
  );
  
  // Use pure turquoise color for the core
  coreGradient.addColorStop(0, '#48EDDD');
  coreGradient.addColorStop(0.1, `rgba(72, 237, 221, ${alpha})`);
  coreGradient.addColorStop(0.3, `rgba(72, 237, 221, ${alpha * 0.7})`);
  coreGradient.addColorStop(1, 'transparent');

  // Draw main beam
  ctx.beginPath();
  ctx.fillStyle = coreGradient;
  ctx.fillRect(0, centerY, ctx.canvas.width, beamWidth);

  // Add pulsing effect
  for (let i = 0; i < 3; i++) {
    const time = Date.now() / (1000 + i * 200);
    const pulseWidth = beamWidth * (1 + Math.sin(time) * 0.2);
    
    const pulseGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, maxRadius
    );
    pulseGradient.addColorStop(0, `rgba(72, 237, 221, ${alpha * 0.8})`);
    pulseGradient.addColorStop(0.2, `rgba(72, 237, 221, ${alpha * 0.4})`);
    pulseGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = pulseGradient;
    ctx.fillRect(0, centerY - pulseWidth/2, ctx.canvas.width, pulseWidth);
  }

  // Add extra glow layer
  const glowGradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, beamWidth * 2
  );
  glowGradient.addColorStop(0, `rgba(72, 237, 221, ${alpha * 0.5})`);
  glowGradient.addColorStop(1, 'transparent');

  ctx.fillStyle = glowGradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.restore();
}