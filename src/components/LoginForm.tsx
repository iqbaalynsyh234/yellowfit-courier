"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("082271153305");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/auth/otp");
    } catch (error) {
      alert("Terjadi kesalahan, coba lagi!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black relative flex items-center justify-center overflow-hidden">
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
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1,
          }}
        />
      </div>
      {/* Content, centered in the image */}
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
        {/* Main Content */}
        <form onSubmit={handleLogin} className="flex flex-col flex-1 justify-center px-6">
          {/* Logo di atas teks Selamat Datang! */}
          <div className="flex items-center rounded-lg px-2 py-2 mb-7 w-fit shadow z-20">
            <Image
              src="/assets/yfk/image/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="text-white font-bold text-xl tracking-wide">Yellow Fit Kitchen</span>
          </div>
          <div className="mb-8">
            <h1 className="text-white text-4xl font-extrabold leading-tight mb-3">
              Selamat
              <br />
              <span className="text-[#FFD823]">Datang!</span>
            </h1>
            <p className="text-gray-300 text-base leading-relaxed text-left">
              Masukkan nomor telepon
              <br />
              yang telah didaftarkan
            </p>
          </div>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-gray-800 bg-opacity-80 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 placeholder-gray-400 text-base backdrop-blur-sm mb-4 text-center"
            required
          />
          <button
            type="submit"
            disabled={isLoading || !phoneNumber}
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base shadow-lg"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <div className="mt-6 text-center">
            <a href="#" className="text-yellow-400 text-xs hover:underline transition-colors">
              Butuh Bantuan? <span className="font-semibold">Hubungi kami</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
