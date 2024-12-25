import React from 'react';
import type { EffectSettings } from '../types/effects';

interface EffectControlsProps {
  settings: EffectSettings;
  onChange: (settings: EffectSettings) => void;
}

export const EffectControls: React.FC<EffectControlsProps> = ({ settings, onChange }) => {
  const handleChange = (key: keyof EffectSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...settings, [key]: Number(e.target.value) });
  };

  return (
    <div className="space-y-8 px-2">
      <div>
        <label className="block text-base font-medium text-gray-300 mb-3 legion-font">Red Overlay</label>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.redOverlay}
          onChange={handleChange('redOverlay')}
          className="w-full h-3 md:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 touch-manipulation"
          style={{
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, rgb(239, 68, 68) 0%, rgb(239, 68, 68) ${settings.redOverlay}%, rgb(55, 65, 81) ${settings.redOverlay}%, rgb(55, 65, 81) 100%)`
          }}
        />
        <div className="mt-2 text-sm text-gray-400 text-right">{settings.redOverlay}%</div>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-300 mb-3 legion-font">Exposure</label>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.exposure}
          onChange={handleChange('exposure')}
          className="w-full h-3 md:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 touch-manipulation"
          style={{
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, rgb(239, 68, 68) 0%, rgb(239, 68, 68) ${settings.exposure}%, rgb(55, 65, 81) ${settings.exposure}%, rgb(55, 65, 81) 100%)`
          }}
        />
        <div className="mt-2 text-sm text-gray-400 text-right">{settings.exposure}%</div>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-300 mb-3 legion-font">Glow Intensity</label>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.glowIntensity}
          onChange={handleChange('glowIntensity')}
          className="w-full h-3 md:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 touch-manipulation"
          style={{
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, rgb(239, 68, 68) 0%, rgb(239, 68, 68) ${settings.glowIntensity}%, rgb(55, 65, 81) ${settings.glowIntensity}%, rgb(55, 65, 81) 100%)`
          }}
        />
        <div className="mt-2 text-sm text-gray-400 text-right">{settings.glowIntensity}%</div>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-300 mb-3 legion-font">Beam Width</label>
        <input
          type="range"
          min="5"
          max="30"
          value={settings.beamWidth}
          onChange={handleChange('beamWidth')}
          className="w-full h-3 md:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 touch-manipulation"
          style={{
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, rgb(239, 68, 68) 0%, rgb(239, 68, 68) ${(settings.beamWidth - 5) * 4}%, rgb(55, 65, 81) ${(settings.beamWidth - 5) * 4}%, rgb(55, 65, 81) 100%)`
          }}
        />
        <div className="mt-2 text-sm text-gray-400 text-right">{settings.beamWidth}px</div>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-300 mb-3 legion-font">Logo Size</label>
        <input
          type="range"
          min="10"
          max="40"
          value={settings.logoSize}
          onChange={handleChange('logoSize')}
          className="w-full h-3 md:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 touch-manipulation"
          style={{
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, rgb(239, 68, 68) 0%, rgb(239, 68, 68) ${(settings.logoSize - 10) * 3.33}%, rgb(55, 65, 81) ${(settings.logoSize - 10) * 3.33}%, rgb(55, 65, 81) 100%)`
          }}
        />
        <div className="mt-2 text-sm text-gray-400 text-right">{settings.logoSize}%</div>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-300 mb-3 legion-font">Logo Opacity</label>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.logoOpacity}
          onChange={handleChange('logoOpacity')}
          className="w-full h-3 md:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 touch-manipulation"
          style={{
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, rgb(239, 68, 68) 0%, rgb(239, 68, 68) ${settings.logoOpacity}%, rgb(55, 65, 81) ${settings.logoOpacity}%, rgb(55, 65, 81) 100%)`
          }}
        />
        <div className="mt-2 text-sm text-gray-400 text-right">{settings.logoOpacity}%</div>
      </div>
    </div>
  );
};