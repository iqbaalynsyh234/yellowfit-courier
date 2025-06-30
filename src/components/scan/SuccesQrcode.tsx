import Image from "next/image";

export default function SuccesQrcode({ onScanAgain }: { onScanAgain: () => void }) {
  return (
    <div className="fixed inset-0 z-50 w-full min-h-screen flex flex-col justify-center items-center bg-black bg-opacity-80">
      <div className="absolute inset-0 w-full h-full z-0 flex justify-center">
        <div className="relative w-full max-w-[375px] h-full">
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
      <div className="relative w-full max-w-[375px] mx-auto flex flex-col min-h-screen z-10">
        {/* Header */}
        <div className="w-full bg-[#FFD823] px-4 py-4 flex items-center justify-center z-10 relative">
          <span className="font-bold text-black text-base">Detail Pengiriman</span>
        </div>
        {/* Konten Sukses */}
        <div className="flex-1 flex flex-col justify-center items-center px-6">
          <div className="flex flex-col items-center mt-12 mb-8">
            <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#22C55E" />
                <path d="M16 25.5L22 31.5L32 19.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-white text-2xl font-bold mb-2 text-center">Pickup Success</div>
            <div className="text-gray-200 text-base text-center">Paket ini berhasil ditambahkan di pengantaran kamu</div>
          </div>
          <button
            className="w-full bg-[#FFD823] text-black font-bold py-3 rounded-xl text-base mb-5 shadow-md hover:bg-yellow-400 transition"
            onClick={onScanAgain}
          >
            Scan Again
          </button>
        </div>
      </div>
    </div>
  );
}