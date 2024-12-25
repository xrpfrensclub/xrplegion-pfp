import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto py-3 px-4 text-center">
        <a 
          href="https://xrpl.xrpfrens.club" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-cyan-500 hover:text-cyan-400 transition-colors font-medium"
        >
          xrpl.xrpfrens.club
        </a>
      </div>
    </footer>
  );
};