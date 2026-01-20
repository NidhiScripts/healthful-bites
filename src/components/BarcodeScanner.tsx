import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import Webcam from 'react-webcam';

interface BarcodeResult {
  barcode: string;
  timestamp: Date;
}

interface BarcodeScannerProps {
  onScanComplete: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanComplete, onClose }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [lastScan, setLastScan] = useState<BarcodeResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  
  const webcamRef = useRef<Webcam>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
    return () => {
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, []);

  const captureAndScan = useCallback(async () => {
    if (!webcamRef.current || !codeReader.current || !isScanning) return;

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      const image = new Image();
      image.src = imageSrc;
      
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const result = await codeReader.current.decodeFromImage(image);
      
      if (result && result.getText()) {
        const barcode = result.getText();
        console.log('Barcode scanned:', barcode); // Debug log
        setLastScan({
          barcode,
          timestamp: new Date()
        });
        onScanComplete(barcode);
        setIsScanning(false);
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        // No barcode found - this is normal, continue scanning
      } else {
        console.error('Scan error:', err);
        setError('Scanning error. Please try again.');
      }
    }
  }, [isScanning, onScanComplete]);

  useEffect(() => {
    if (!isScanning || !isCameraReady) return;

    const interval = setInterval(captureAndScan, 500);
    return () => clearInterval(interval);
  }, [isScanning, isCameraReady, captureAndScan]);

  const handleManualSubmit = () => {
    if (manualBarcode.trim()) {
      console.log('Manual barcode entered:', manualBarcode.trim()); // Debug log
      onScanComplete(manualBarcode.trim());
      onClose();
    }
  };

  const handleRetry = () => {
    setIsScanning(true);
    setLastScan(null);
    setError('');
  };

  const videoConstraints = {
    facingMode: 'environment' as const,
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Barcode Scanner</h2>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-white/80">Position the barcode within the camera view</p>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl">
          {/* Webcam */}
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={() => setIsCameraReady(true)}
              onUserMediaError={(err) => {
                console.error('Camera error:', err);
                setError('Camera access denied. Please allow camera permissions.');
              }}
              className="w-full h-full object-cover"
            />
            
            {/* Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Scanning Frame */}
                <div className="absolute inset-4 border-2 border-white rounded-xl">
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-xl"></div>
                </div>
                
                {/* Scanning Line Animation */}
                <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2">
                  <div className="h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl text-center">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}

          {lastScan && (
            <div className="mt-4 bg-green-500/20 border border-green-500 text-green-100 p-4 rounded-xl">
              <p className="font-semibold text-center">Barcode Scanned Successfully!</p>
              <p className="text-center mt-2 font-mono text-sm">{lastScan.barcode}</p>
              <p className="text-center text-xs mt-1">{lastScan.timestamp.toLocaleTimeString()}</p>
            </div>
          )}

          {!isCameraReady && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Initializing camera...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="bg-white p-4 border-t">
        <div className="flex gap-4 justify-center">
          {!lastScan ? (
            <button
              onClick={() => setIsScanning(!isScanning)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              {isScanning ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pause Scanning
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Resume Scanning
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Scan Another
            </button>
          )}
          
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Close
          </button>
          
          <button
            onClick={() => setShowManualInput(!showManualInput)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Enter Barcode Manually
          </button>
        </div>
        
        {/* Manual Barcode Input */}
        {showManualInput && (
          <div className="mt-4 p-4 bg-purple-50 rounded-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                placeholder="Enter barcode number (e.g., 8901769200117)"
                className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-xl text-lg focus:outline-none focus:border-purple-400"
              />
              <button
                onClick={handleManualSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Submit
              </button>
            </div>
            <div className="mt-2 text-sm text-purple-700">
              Try: 8901058000269 (Maggi) or 8901769200118 (Parle-G)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
