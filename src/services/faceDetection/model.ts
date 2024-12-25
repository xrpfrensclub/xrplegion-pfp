import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

let model: blazeface.BlazeFaceModel | null = null;

export async function loadModel(): Promise<blazeface.BlazeFaceModel> {
  if (model) return model;
  
  await tf.ready();
  if (!tf.getBackend()) {
    await tf.setBackend('webgl');
  }
  
  model = await blazeface.load();
  return model;
}