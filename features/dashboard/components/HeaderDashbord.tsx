import QrCodePage from "@/components/scan/ScanQrcode";
import Image from "next/image";
import { useState } from "react";

export default function HeaderDashboardPage() {
  const [showScan, setShowScan] = useState(false);

  if (showScan) {
    return (
      <div className="fixed inset-0 z-[9999] w-full h-full flex items-center justify-center bg-black bg-opacity-80">
        <div className="w-full max-w-[375px] mx-auto">
          <QrCodePage onClose={() => setShowScan(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFD823] pt-4 pb-4 px-4 z-10 relative rounded-b-2xl" style={{ width: 385, margin: '0 auto' }}>
      <div className="flex items-center mb-3">
        <Image src="/assets/yfk/image/logo-item.png" alt="Logo" width={170} height={170} className="mr-2" />
      </div>
      <div className="text-black font-bold text-base mb-1">A</div>
      <div className="text-black text-xs mb-3">089652729286</div>
      <div className="flex items-center bg-white rounded-lg px-3 py-2 mb-1">
        <input type="text" placeholder="Barcode / Nama Customer" className="flex-1 bg-transparent outline-none text-black text-sm" />
        <button className="ml-2" onClick={() => setShowScan(true)}>
          <img src="/assets/yfk/icon/qr_code_scanner.png" alt="QR Code Scanner" width="28" height="28" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
