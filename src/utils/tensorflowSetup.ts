import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { TENSORFLOW_CONFIG } from './tensorflowConfig';

let model: faceLandmarksDetection.FaceLandmarksDetector | null = null;
let isInitializing = false;

const initializeBackend = async () => {
  if (!tf.getBackend()) {
    await tf.setBackend(TENSORFLOW_CONFIG.backend);
  }
  await tf.ready();
};

export const initializeTensorFlow = async () => {
  if (model) return model;
  
  if (isInitializing) {
    // Wait for initialization to complete
    return new Promise((resolve) => {
      const checkModel = () => {
        if (model) {
          resolve(model);
        } else if (!isInitializing) {
          resolve(null);
        } else {
          setTimeout(checkModel, 100);
        }
      };
      checkModel();
    });
  }

  try {
    isInitializing = true;
    await initializeBackend();
    
    model = await faceLandmarksDetection.createDetector(
      TENSORFLOW_CONFIG.model,
      TENSORFLOW_CONFIG.modelConfig
    );
    
    return model;
  } catch (error) {
    console.error('TensorFlow initialization error:', error);
    throw new Error('Failed to initialize face detection');
  } finally {
    isInitializing = false;
  }
};