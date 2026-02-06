import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { Camera, X, Loader2, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface BarcodeScannerProps {
    onDetected: (barcode: string) => void;
    onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected, onClose }) => {
    const webcamRef = useRef<Webcam>(null);
    const readerRef = useRef<BrowserMultiFormatReader>(new BrowserMultiFormatReader());
    const [isScanning, setIsScanning] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    const startScanning = useCallback(() => {
        if (!isScanning || !webcamRef.current || !isCameraReady) return;

        const video = webcamRef.current.video;
        if (video && video.readyState === 4) {
            readerRef.current.decodeFromVideoElement(video).then(result => {
                if (result && isScanning) {
                    console.log('Barcode detected:', result.getText());
                    setIsScanning(false);
                    onDetected(result.getText());
                    readerRef.current.reset();
                }
            }).catch(err => {
                if (err && err.name !== 'NotFoundException') {
                    // console.error('Scanning error:', err);
                }
                // Continue scanning loop if still scanning
                if (isScanning) {
                    setTimeout(startScanning, 200);
                }
            });
        }
    }, [isScanning, isCameraReady, onDetected]);

    useEffect(() => {
        if (isScanning && isCameraReady) {
            startScanning();
        }

        return () => {
            readerRef.current.reset();
        };
    }, [isScanning, isCameraReady, startScanning]);

    const handleUserMedia = () => {
        setIsLoading(false);
        setIsCameraReady(true);
    };

    const handleUserMediaError = (err: string | DOMException) => {
        console.error('Camera error:', err);
        setIsLoading(false);
        setError('Failed to access camera. Please ensure you have granted permission.');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
                    <div className="flex items-center gap-2">
                        <Camera className="w-6 h-6" />
                        <h2 className="text-xl font-bold">Scan Barcode</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Camera Feed Container */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    {error ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                            <p className="text-lg mb-4 text-red-400 font-medium">{error}</p>
                            <Button
                                onClick={() => window.location.reload()}
                                variant="outline"
                                className="gap-2 border-white text-white hover:bg-white/10"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Retry
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                onUserMedia={handleUserMedia}
                                onUserMediaError={handleUserMediaError}
                                screenshotFormat="image/jpeg"
                                mirrored={false}
                                videoConstraints={{
                                    facingMode: 'environment',
                                    width: { ideal: 1280 },
                                    height: { ideal: 720 },
                                    aspectRatio: 1.777777778
                                }}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlays */}
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                                        <p className="text-white font-medium">Initializing camera...</p>
                                    </div>
                                </div>
                            )}

                            {isCameraReady && isScanning && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Scanning Frame Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-64 h-40 border-2 border-dashed border-indigo-400 rounded-2xl relative">
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-indigo-500 -mt-1 -ml-1 rounded-tl-sm"></div>
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-indigo-500 -mt-1 -mr-1 rounded-tr-sm"></div>
                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-indigo-500 -mb-1 -ml-1 rounded-bl-sm"></div>
                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-indigo-500 -mb-1 -mr-1 rounded-br-sm"></div>

                                            {/* Scanning Line Animation */}
                                            <div className="absolute left-0 right-0 h-0.5 bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-scan"></div>
                                        </div>
                                    </div>

                                    {/* Status Text */}
                                    <div className="absolute bottom-6 left-0 right-0 text-center">
                                        <p className="bg-black/40 inline-block px-4 py-1.5 rounded-full text-white text-sm backdrop-blur-md border border-white/10">
                                            Align barcode within the frame
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer info & Manual Entry */}
                <div className="p-6 bg-slate-50 border-t">
                    <div className="flex flex-col gap-4">
                        <p className="text-slate-600 text-sm text-center">
                            Hold the product steady and ensure good lighting.
                        </p>

                        <div className="relative mt-2">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-50 text-slate-400 font-medium uppercase tracking-wider">Or enter manually</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter barcode number"
                                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none transition-colors text-lg"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const value = (e.target as HTMLInputElement).value;
                                        if (value.trim()) onDetected(value.trim());
                                    }
                                }}
                                id="manual-barcode-input"
                            />
                            <Button
                                onClick={() => {
                                    const input = document.getElementById('manual-barcode-input') as HTMLInputElement;
                                    if (input.value.trim()) onDetected(input.value.trim());
                                }}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6"
                            >
                                GO
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default BarcodeScanner;
