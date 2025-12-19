import React from 'react';
import { Toaster } from 'react-hot-toast';
import QRGenerator from './components/QRGenerator/QRGenerator';
import QRHistory from './components/QRGenerator/QRHistory';

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Generador de Códigos QR
          </h1>
          <p className="text-gray-600 text-lg">
            Crea, personaliza y comparte tus códigos QR en segundos
          </p>
        </header>

        <main>
          <QRGenerator />
        </main>

        <section className="pt-8 border-t border-gray-200">
          <QRHistory />
        </section>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
