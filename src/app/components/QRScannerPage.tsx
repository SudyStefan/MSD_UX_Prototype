import { useRef, useState, useEffect } from 'react';

interface QRScannerPageProps {
  onScan?: (result: string) => void;
}

export function QRScannerPage({ onScan }: QRScannerPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
 const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsScanning(true);
          setShowResult(false);
          simulateQRScan();
        };
      }
    } catch (error) {
      alert(
        'Camera access error: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  };

  const stopCamera = () => {
    setIsScanning(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
  };


  const simulateQRScan = () => {
    scanTimeoutRef.current = setTimeout(() => {
      const mockQRData = 'https://example.com/event/12345';
      setScannedResult(mockQRData);
      setShowResult(true);
      setIsScanning(false);
      onScan?.(mockQRData);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-white px-6 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan QR</h2>
      <p className="text-sm text-gray-600 mb-6">
        Point your camera at the QR code
      </p>

      {/* QR Frame */}
      <div className="relative w-64 h-64 mx-auto mb-6 bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          autoPlay
          muted
        />
        <canvas ref={canvasRef} className="hidden" />

        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <span className="text-5xl">📱</span>
          </div>
        )}

        {/* Scanning indicator */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded">
                Scanning...
              </p>
            </div>
          </div>
        )}

        {/* Corner markers */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-indigo-600"></div>
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-indigo-600"></div>
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-indigo-600"></div>
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-indigo-600"></div>
      </div>

      {/* Result box*/}
      {showResult && (
        <div className="mb-6 p-4 bg-green-50 border-2 border-green-400 rounded-lg shadow-md animate-pulse">
          <p className="text-xs uppercase font-bold text-green-700 mb-2">
            The QR code was scanned successfully
          </p>
          <p className="text-sm text-green-800 break-all font-mono bg-white p-2 rounded">
            {scannedResult}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-auto">
        {!isScanning ? (
          <button
            onClick={startCamera}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md"
          >
            Start Camera
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="flex-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors shadow-md"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
