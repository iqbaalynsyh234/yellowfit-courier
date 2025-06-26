interface QrCodeErrorProps {
  onScanAgain?: () => void;
}

export default function QrCodeError({ onScanAgain }: QrCodeErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Ilustrasi */}
      <div className="mb-6 mt-8">
        {/* SVG ilustrasi error barcode */}
       <img 
          src="/assets/yfk/image/not_found.png" 
          alt="Description" 
          width="120" 
          height="120"
          className="w-30 h-30"
        />

      </div>
      {/* Judul */}
      <div className="text-white text-2xl font-bold mb-2">Invalid Barcode</div>
      {/* Subjudul */}
      <div className="text-gray-200 text-center mb-8 px-6">Pastikan Barcode sesuai dan lakukan scan ulang</div>
      {/* Tombol Scan Again */}
      <button
        className="w-[90%] max-w-xs bg-[#FFD823] text-black font-bold py-3 rounded-xl text-base shadow-md hover:bg-yellow-400 transition"
        onClick={onScanAgain}
      >
        Scan Again
      </button>
    </div>
  );
}