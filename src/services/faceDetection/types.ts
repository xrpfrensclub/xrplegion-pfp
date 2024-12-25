export interface Point {
  x: number;
  y: number;
}

export interface EyePositions {
  leftEye: Point;
  rightEye: Point;
}

export interface FaceDetectionResult {
  eyes: EyePositions | null;
  error?: string;
  confidence?: number;
}

export interface FaceLandmarks {
  landmarks: number[][];
  probability: number[];
}

export type DetectionMode = 'precise' | 'fast';