interface AspectRatioDimensions {
  width: number;
  height: number;
  x: number;
  y: number;
}

export function calculateAspectRatio(
  imgWidth: number,
  imgHeight: number,
  canvasWidth: number,
  canvasHeight: number
): AspectRatioDimensions {
  const imgAspectRatio = imgWidth / imgHeight;
  const canvasAspectRatio = canvasWidth / canvasHeight;
  
  let width: number;
  let height: number;
  
  if (imgAspectRatio > canvasAspectRatio) {
    // Image is wider than canvas
    width = canvasWidth;
    height = canvasWidth / imgAspectRatio;
  } else {
    // Image is taller than canvas
    height = canvasHeight;
    width = canvasHeight * imgAspectRatio;
  }
  
  // Center the image
  const x = (canvasWidth - width) / 2;
  const y = (canvasHeight - height) / 2;
  
  return { width, height, x, y };
}