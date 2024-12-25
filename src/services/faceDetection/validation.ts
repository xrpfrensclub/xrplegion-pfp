import type { Point, EyePositions } from './types';

export function validateEyePosition(point: Point): boolean {
  return (
    typeof point.x === 'number' &&
    typeof point.y === 'number' &&
    !isNaN(point.x) &&
    !isNaN(point.y) &&
    isFinite(point.x) &&
    isFinite(point.y) &&
    point.x >= 0 &&
    point.y >= 0
  );
}

export function validateEyePositions(eyes: EyePositions): boolean {
  if (!validateEyePosition(eyes.leftEye) || !validateEyePosition(eyes.rightEye)) {
    return false;
  }

  // Ensure reasonable distance between eyes
  const distance = Math.sqrt(
    Math.pow(eyes.leftEye.x - eyes.rightEye.x, 2) +
    Math.pow(eyes.leftEye.y - eyes.rightEye.y, 2)
  );

  return distance > 10; // Minimum reasonable distance between eyes
}

export function normalizeEyePositions(eyes: EyePositions): EyePositions {
  // Ensure left eye is actually on the left
  if (eyes.leftEye.x < eyes.rightEye.x) {
    return {
      leftEye: eyes.rightEye,
      rightEye: eyes.leftEye
    };
  }
  return eyes;
}