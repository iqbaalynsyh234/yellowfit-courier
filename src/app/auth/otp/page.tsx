"use client";
import HeaderPage from "@/components/Header";
import KeyboardPage from "@/components/Keyboard";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const phoneNumber = "082271153305";
  const router = useRouter();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleKeyboardInput = (key: string | number) => {
    if (key === "⌫") {
      setOtp((prev) => {
        const idx = prev.findLastIndex((d) => d !== "");
        if (idx === -1) return prev;
        const newOtp = [...prev];
        newOtp[idx] = "";
        setActiveIndex(Math.max(0, idx));
        return newOtp;
      });
    } else if (typeof key === "number" || (typeof key === "string" && /^\d$/.test(key))) {
      setOtp((prev) => {
        const idx = prev.findIndex((d) => d === "");
        if (idx === -1) return prev;
        const newOtp = [...prev];
        newOtp[idx] = String(key);
        setActiveIndex(Math.min(5, idx + 1));
        return newOtp;
      });
    }
  };

  const handleOtpClick = (index: number) => {
    setActiveIndex(index);
    setShowKeyboard(true);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

  const handleHiddenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lastChar = value.slice(-1);
    
    if (/^\d$/.test(lastChar)) {
      handleKeyboardInput(lastChar);
    }
    
    // Clear the hidden input
    e.target.value = "";
  };

  const handleHiddenInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      handleKeyboardInput("⌫");
    }
  };

  useEffect(() => {
    // Auto-focus first empty field
    const firstEmptyIndex = otp.findIndex(digit => digit === "");
    if (firstEmptyIndex !== -1) {
      setActiveIndex(firstEmptyIndex);
    } else if (otp.every(digit => digit !== "")) {
      setActiveIndex(5);
    }
  }, [otp]);

  return (
    <div className="min-h-screen w-full bg-black relative flex items-center justify-center overflow-hidden">
      <input
        ref={hiddenInputRef}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        className="absolute opacity-0 pointer-events-none"
        onChange={handleHiddenInputChange}
        onKeyDown={handleHiddenInputKeyDown}
        style={{ left: '-9999px' }}
      />
      
      <div
        className="absolute"
        style={{
          width: 375,
          height: 812,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.8,
        }}
      >
        <Image src="/assets/yfk/image/bg-img.png" alt="Background" width={475} height={912} style={{ objectFit: "cover", width: "100%", height: "100%" }} priority />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1,
          }}
        />
      </div>
      <div
        className="absolute flex flex-col justify-between"
        style={{
          width: 375,
          height: 812,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <div className="flex flex-col flex-1 justify-center px-6 pt-10">
          {/* Logo di atas teks Masukkan OTP, di tengah */}
          <div className="flex flex-col items-center w-full mb-6">
            <div className="flex items-center rounded-lg px-2 py-2 w-fit shadow z-20">
              <Image
                src="/assets/yfk/image/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="text-white font-bold text-xl tracking-wide">Yellow Fit Kitchen</span>
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold mb-2 text-center">Masukkan OTP</h1>
          <p className="text-gray-300 text-sm text-center mb-1">Kami telah mengirimkan nomor telepon ke nomor whatsapp berikut</p>
          <p className="text-white text-center font-semibold mb-4">{phoneNumber}</p>
          
          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-3">
            {otp.map((digit, idx) => (
              <div 
                key={idx} 
                className={`w-12 h-12 rounded-lg bg-gray-800 border-2 flex items-center justify-center text-2xl text-white font-bold cursor-pointer transition-all duration-200 relative ${
                  activeIndex === idx ? 'border-yellow-400 bg-gray-700' : 'border-gray-600'
                }`}
                onClick={() => handleOtpClick(idx)}
              >
                {digit || ""}
                {/* Blinking cursor */}
                {activeIndex === idx && !digit && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-6 bg-yellow-400 animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center text-xs text-gray-300 mb-4">
            Tidak menerima kode? <span className="text-white font-semibold cursor-pointer hover:underline">Kirim Ulang</span>
          </div>
          
          <button
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all duration-200 text-base shadow-lg mb-6"
            onClick={() => router.push("/pages/dashboard")}
          >
            Verifikasi
          </button>
          
          {showKeyboard && <KeyboardPage onKeyPress={handleKeyboardInput} />}
        </div>
      </div>
    </div>
  );
}
