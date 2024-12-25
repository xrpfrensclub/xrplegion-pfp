import React, { useState } from 'react';
import { Upload, Zap, Sliders } from 'lucide-react';
import { ImageCanvas } from './ImageCanvas';
import { EffectControls } from './EffectControls';
import { useImageUpload } from '../hooks/useImageUpload';
import type { EffectSettings } from '../types/effects';

const defaultSettings: EffectSettings = {
  redOverlay: 100,
  exposure: 100,
  glowIntensity: 47,
  beamWidth: 5,
  logoSize: 17,
  logoOpacity: 100
};

const ImageEditor: React.FC = () => {
  const [settings, setSettings] = useState<EffectSettings>(defaultSettings);
  const { image, handleImageUpload } = useImageUpload();

  return (
    <div className="flex flex-col items-center gap-8 p-4 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-red-500 flex items-center gap-2 legion-font text-center">
        Legion PFP Generator <Zap className="text-yellow-400" />
      </h1>
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row gap-8 items-start">
        <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl border-2 border-red-900/50 hover:border-red-500/50 transition-all duration-300">
          <ImageCanvas image={image} settings={settings} />
          <UploadButton handleImageUpload={handleImageUpload} image={image} />
        </div>
        
        <div className="w-80 bg-gray-800/50 backdrop-blur p-6 rounded-xl border-2 border-red-900/50 hover:border-red-500/50 transition-all duration-300">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-white legion-font">Effect Controls</h2>
          </div>
          <EffectControls settings={settings} onChange={setSettings} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full flex flex-col gap-6">
        <div className="bg-gray-800/50 backdrop-blur p-4 rounded-xl border-2 border-red-900/50">
          <ImageCanvas image={image} settings={settings} />
          <UploadButton handleImageUpload={handleImageUpload} image={image} />
        </div>

        <div className="bg-gray-800/50 backdrop-blur p-4 rounded-xl border-2 border-red-900/50">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-white legion-font">Effect Controls</h2>
          </div>
          <EffectControls settings={settings} onChange={setSettings} />
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>Create your unique Legion warrior profile picture! 🎭</p>
      </div>
    </div>
  );
};

const UploadButton: React.FC<{
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  image: string | null;
}> = ({ handleImageUpload, image }) => (
  <label className="mt-6 block w-full cursor-pointer">
    <div className="relative group">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <div className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 rounded-lg transition-all duration-300 font-bold transform hover:scale-105 shake-hover text-white legion-font">
        <Upload className="w-5 h-5" />
        {image ? 'Choose Another Image' : 'Upload Your Image'}
      </div>
    </div>
  </label>
);

export default ImageEditor;