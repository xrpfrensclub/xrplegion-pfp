export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const text = 'xrpl.xrpfrens.club';
  const padding = 20;
  const barHeight = 40;
  
  // Draw black bar at bottom
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  ctx.fillRect(x, y + height - barHeight, width, barHeight);
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = '16px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    text,
    x + width / 2,
    y + height - barHeight / 2
  );
}