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
    <div className="w-full max-w-[375px] bg-[#FFD823] rounded-b-3xl px-4 pt-6 pb-4 z-10 relative">
      <div className="flex items-center mb-2">
        <Image src="/assets/yfk/image/logo-item.png" alt="Logo" width={205} height={205} className="mr-2" />
      </div>
      <div className="text-black font-bold text-sm leading-tight">A</div>
      <div className="text-black text-xs mb-3">089652729286</div>
      <div className="flex items-center bg-white rounded-lg px-3 py-2">
        <input type="text" placeholder="Barcode / Nama Customer" className="flex-1 bg-transparent outline-none text-black text-sm" />
        <button className="ml-2" onClick={() => setShowScan(true)}>
          <img src="/assets/yfk/icon/qr_code_scanner.png" alt="QR Code Scanner" width="70" height="70" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
