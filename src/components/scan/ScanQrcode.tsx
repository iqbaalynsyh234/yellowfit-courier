import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ErrorQrcode from "./ErrorQrcode";
import SuccesQrcode from "./SuccesQrcode";

interface QrCodePageProps {
  onClose?: () => void;
}

export default function QrCodePage({ onClose }: QrCodePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setCameraActive(false);
      }
    }
    enableCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    }
  }, [cameraActive]);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setPhoto(dataUrl);
        setTimeout(() => {
          if (dataUrl.includes("VALID")) {
            setSuccess(true);
            setError(false);
            setScannedResult("VALID QR");
          } else {
            setError(true);
            setSuccess(false);
            setScannedResult(null);
          }
        }, 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-full min-h-screen flex flex-col justify-center items-center bg-transparent">
      <div className="absolute inset-0 w-full h-full z-0 flex justify-center">
        <div className="relative w-full max-w-[475px] h-full">
          <Image
            src="/assets/yfk/image/bg-img.png"
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            priority
            className="rounded-none"
          />
        </div>
      </div>
      {/* Wrapper utama */}
      <div className="relative w-full max-w-[475px] mx-auto flex flex-col min-h-screen z-10">
        {/* Tombol Close */}
        {onClose && (
          <button
            className="absolute top-4 right-4 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 shadow"
            onClick={onClose}
            aria-label="Tutup"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M6 6L14 14M14 6L6 14" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        {/* Header */}
        <div className="w-full bg-[#FFD823] px-4 py-4 flex items-center justify-center z-10 relative">
          <span className="font-bold text-black text-base">Detail Pengiriman</span>
        </div>
        {/* Konten Kamera */}
        <div className="flex-1 w-full flex flex-col justify-center items-center">
          <div className="w-full max-w-xs mx-auto flex flex-col items-center">
            {error ? (
              <ErrorQrcode onScanAgain={() => {
                setError(false);
                setPhoto(null);
              }} />
            ) : (
              <>
                {cameraActive && !photo && (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full max-w-xs rounded-lg border-4 border-white shadow-lg"
                      style={{ aspectRatio: "3/4", objectFit: "cover" }}
                    />
                    <button
                      className="mt-4 bg-white rounded-full p-4 shadow flex items-center justify-center"
                      onClick={handleCapture}
                      aria-label="Ambil Foto"
                    >
                      {/* Ikon kamera */}
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#FFD823" strokeWidth="2"/>
                        <rect x="8" y="10" width="8" height="6" rx="2" fill="#FFD823"/>
                        <circle cx="12" cy="13" r="2" fill="#fff"/>
                      </svg>
                    </button>
                  </>
                )}
                {photo && (
                  <div className="flex flex-col items-center">
                    <img src={photo} alt="Hasil Foto" className="w-full max-w-xs rounded-lg border-4 border-white shadow-lg" />
                    <button
                      className="mt-4 bg-[#FFD823] text-black font-bold py-2 px-6 rounded-xl shadow"
                      onClick={() => setPhoto(null)}
                    >
                      Ambil Ulang
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {success ? (
        <SuccesQrcode onScanAgain={() => { setSuccess(false); setPhoto(null); setError(false); setScannedResult(null); }} />
      ) : error ? (
        <ErrorQrcode onScanAgain={() => { setError(false); setPhoto(null); setSuccess(false); setScannedResult(null); }} />
      ) : null}
    </div>
  );
}