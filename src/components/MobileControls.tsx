import React from 'react';
import { X } from 'lucide-react';
import type { EffectSettings } from '../types/effects';
import { EffectControls } from './EffectControls';

interface MobileControlsProps {
  show: boolean;
  onClose: () => void;
  settings: EffectSettings;
  onChange: (settings: EffectSettings) => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  show,
  onClose,
  settings,
  onChange,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur rounded-t-xl border-t-2 border-red-900/50 p-6 transition-transform duration-300 ease-out">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white legion-font">Effect Controls</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pb-safe">
          <EffectControls settings={settings} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};