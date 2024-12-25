import { loadModel } from './model';
import { validateEyePositions, normalizeEyePositions } from './validation';
import type { FaceDetectionResult, Point, FaceLandmarks, DetectionMode } from './types';

const CONFIDENCE_THRESHOLD = 0.8;
const MAX_RETRIES = 3;
const RETRY_DELAY = 500;

function calculateEyePositions(predictions: FaceLandmarks) {
  const landmarks = predictions.landmarks;
  
  const leftEye: Point = { 
    x: landmarks[1][0],
    y: landmarks[1][1]
  };
  
  const rightEye: Point = {
    x: landmarks[0][0],
    y: landmarks[0][1]
  };

  return normalizeEyePositions({ leftEye, rightEye });
}

async function detectWithFallback(
  image: HTMLImageElement,
  mode: DetectionMode = 'precise'
): Promise<FaceDetectionResult> {
  try {
    const model = await loadModel();
    const predictions = await model.estimateFaces(image, mode === 'fast');

    if (!predictions || predictions.length === 0) {
      throw new Error('No face detected');
    }

    const bestPrediction = predictions[0] as FaceLandmarks;
    const confidence = bestPrediction.probability[0];

    if (confidence < CONFIDENCE_THRESHOLD) {
      // If precise mode failed, try fast mode
      if (mode === 'precise') {
        return detectWithFallback(image, 'fast');
      }
      throw new Error('Low confidence in face detection');
    }

    const eyes = calculateEyePositions(bestPrediction);
    
    if (!validateEyePositions(eyes)) {
      throw new Error('Invalid eye positions detected');
    }

    return { eyes, confidence };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Face detection failed';
    console.error('Face detection error:', error);
    return { eyes: null, error: message };
  }
}

async function retryDetection(
  image: HTMLImageElement, 
  retries: number = 0
): Promise<FaceDetectionResult> {
  try {
    const result = await detectWithFallback(image);
    if (result.eyes || retries >= MAX_RETRIES) {
      return result;
    }

    // Wait and retry
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return retryDetection(image, retries + 1);
  } catch (error) {
    return { 
      eyes: null, 
      error: 'Failed to detect face after multiple attempts' 
    };
  }
}

export async function detectFace(image: HTMLImageElement): Promise<FaceDetectionResult> {
  return retryDetection(image);
}