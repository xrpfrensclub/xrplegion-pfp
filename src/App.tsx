import React from 'react';
import ImageEditor from './components/ImageEditor';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pb-16">
      <div className="container mx-auto py-8">
        <ImageEditor />
      </div>
      <Footer />
    </div>
  );
}

export default App;