import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const TENSORFLOW_CONFIG = {
  backend: 'webgl',
  modelConfig: {
    maxFaces: 1,
    refineLandmarks: true,
    runtime: 'tfjs' as const,
  },
  model: faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
};