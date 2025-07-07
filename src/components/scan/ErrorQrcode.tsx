import Image from "next/image";

interface QrCodeErrorProps {
  onScanAgain?: () => void;
}

export default function QrCodeError({ onScanAgain }: QrCodeErrorProps) {
  return (
    <div className="fixed inset-0 z-50 w-full min-h-screen flex flex-col justify-center items-center bg-black bg-opacity-80">
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
      <div className="relative w-full max-w-[475px] mx-auto flex flex-col min-h-screen z-10">
        {/* Header */}
        <div className="w-full bg-[#FFD823] px-4 py-4 flex items-center justify-center z-10 relative">
          <span className="font-bold text-black text-base">Detail Pengiriman</span>
        </div>
        {/* Konten Error */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Ilustrasi */}
          <div className="mb-6 mt-8">
            <img 
              src="/assets/yfk/image/not_found.png" 
              alt="Description" 
              width="120" 
              height="120"
              className="w-30 h-30"
            />
          </div>
          <div className="text-white text-2xl font-bold mb-2 text-center">Invalid Barcode</div>
          <div className="text-gray-200 text-center mb-8 px-6">Pastikan Barcode sesuai dan lakukan scan ulang</div>
          <button
            className="w-full bg-[#FFD823] text-black font-bold py-3 rounded-xl text-base shadow-md hover:bg-yellow-400 transition mb-5"
            onClick={onScanAgain}
          >
            Scan Again
          </button>
        </div>
      </div>
    </div>
  );
}