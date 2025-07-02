"use client";
import HeaderPage from "@/components/Header";
import KeyboardPage from "@/components/Keyboard";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOtpVerification } from "@/hooks/useOtpVerification";

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const phoneNumber = "082271153305";
  const router = useRouter();
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const { verifyOtp, loading, error } = useOtpVerification();
  const [counter, setCounter] = useState(59);
  const [canResend, setCanResend] = useState(false);

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
    
    e.target.value = "";
  };

  const handleHiddenInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      handleKeyboardInput("⌫");
    }
  };

  const handleVerification = async () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      const result = await verifyOtp(phoneNumber, otpString);
      if (result && result.status === "success") {
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        router.push("/pages/dashboard");
      } else {
        console.error("Verification failed");
      }
    }
  };

  useEffect(() => {
    const firstEmptyIndex = otp.findIndex(digit => digit === "");
    if (firstEmptyIndex !== -1) {
      setActiveIndex(firstEmptyIndex);
    } else if (otp.every(digit => digit !== "")) {
      setActiveIndex(5);
    }
  }, [otp]);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [counter]);

  // Fungsi untuk resend OTP
  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setCounter(59);
  };

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
          width: 475,
          height: 917,
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
          width: 475,
          height: 812,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <div className="flex flex-col flex-1 justify-center px-6 pt-10">
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
          {error && (
            <div className="text-red-400 text-sm text-center mb-4">
              {error}
            </div>
          )}
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
                {activeIndex === idx && !digit && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-6 bg-yellow-400 animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center text-xs text-gray-300 mb-4 flex items-center justify-center gap-2">
            Tidak menerima kode?
            <span
              className={`text-white font-semibold cursor-pointer hover:underline ${!canResend && "opacity-50 pointer-events-none"}`}
              onClick={handleResend}
            >
              Kirim Ulang
            </span>
            <span className="countdown">
              <span
                style={{ "--value": counter } as React.CSSProperties}
                aria-live="polite"
                aria-label={String(counter)}
              >
                {counter}
              </span>
            </span>
          </div>
          
          <button
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all duration-200 text-base shadow-lg mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleVerification}
            disabled={loading || otp.join("").length !== 6}
          >
            {loading ? "Memverifikasi..." : "Verifikasi"}
          </button>
          
          {showKeyboard && <KeyboardPage onKeyPress={handleKeyboardInput} />}
        </div>
      </div>
    </div>
  );
}
