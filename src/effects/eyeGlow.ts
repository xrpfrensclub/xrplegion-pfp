import type { EffectSettings } from '../types/effects';

export function drawEyeGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  settings: EffectSettings
) {
  const intensity = settings.glowIntensity;
  const alpha = intensity / 100;

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  // Star-like core
  const drawStar = (size: number, opacity: number) => {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      const len = size * (1 + Math.sin(Date.now() / 200) * 0.2);
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + Math.cos(angle) * len,
        y + Math.sin(angle) * len
      );
    }
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Multiple layers of stars
  for (let i = 0; i < 3; i++) {
    ctx.shadowColor = '#48EDDD';
    ctx.shadowBlur = 20 + i * 5;
    drawStar(15 + i * 5, alpha * (1 - i * 0.2));
  }

  // Intense center glow
  const centerGlow = ctx.createRadialGradient(x, y, 0, x, y, 15);
  centerGlow.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
  centerGlow.addColorStop(0.2, `rgba(72, 237, 221, ${alpha * 0.8})`);
  centerGlow.addColorStop(1, 'transparent');

  ctx.fillStyle = centerGlow;
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2);
  ctx.fill();

  // Outer glow with rays
  const rayCount = 8;
  for (let i = 0; i < rayCount; i++) {
    const angle = (Math.PI * 2 / rayCount) * i;
    const len = 25 * (1 + Math.sin(Date.now() / 300 + i) * 0.2);
    
    const gradient = ctx.createLinearGradient(
      x, y,
      x + Math.cos(angle) * len,
      y + Math.sin(angle) * len
    );
    gradient.addColorStop(0, `rgba(72, 237, 221, ${alpha * 0.5})`);
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.cos(angle) * len,
      y + Math.sin(angle) * len
    );
    ctx.stroke();
  }

  ctx.restore();
}