"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserLogin } from "@/hooks/UserLogin";
import ErrorLogin from "./allert/ErrorLogin";

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("082271153305");
  const router = useRouter();
  const { login, loading, error, setError } = useUserLogin();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
    setError(null);
    setErrorMessage("");
    const data = await login(phoneNumber);
    console.log('Login data received:', data);
    if (data && (data.success || data.status === 'success')) {
      router.push(`/auth/otp?phone=${phoneNumber}`);
    } else if (
      (data && (data.status === 'fail' || data.code === 400 || (data.message && data.message.toLowerCase().includes("Akun tidak terdaftar")))) ||
      (error && error.toLowerCase().includes("Akun tidak terdaftar"))
    ) {
      setErrorMessage(data?.message || error || "Nomor yang anda masukkan tidak terdaftar disistem, segera hubungi admin.");
      setShowError(true);
    }
  };

  const handleBack = () => {
    setShowError(false);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen w-full bg-black relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute"
        style={{
          width: 475,
          height: 915,
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
        {/* Tampilkan hanya ErrorLogin jika showError true */}
        {showError ? (
          <div className="flex flex-1 items-center justify-center">
            <ErrorLogin message={errorMessage} onBack={handleBack} />
          </div>
        ) : (
          // Main Content
          <form onSubmit={handleLogin} className="flex flex-col flex-1 justify-center px-6">
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
              disabled={loading || !phoneNumber}
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base shadow-lg"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <div className="mt-6 text-center">
              <a href="#" className="text-yellow-400 text-xs hover:underline transition-colors">
                Butuh Bantuan? <span className="font-semibold">Hubungi kami</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
