interface ScanQrPickupPageProps {
  onScanClick?: () => void;
}

export default function ScanQrPickupPage({ onScanClick }: ScanQrPickupPageProps) {
  return (
    <div className="bg-[#FFD823] px-4 py-3 flex flex-col gap-2">
      <div className="font-bold text-lg text-black tracking-wider">GRK1L120240207091800</div>
      <div className="text-xs text-gray-700 mb-2">Masukkan Kode Barcode atau scan barcode</div>
      <div className="flex items-center gap-2">
        <input
          className="flex-1 rounded-full px-4 py-2 text-black bg-white border border-gray-300 focus:outline-none"
          placeholder="1668091"
          defaultValue="1668091"
        />
        <button className="bg-white rounded-full p-2 border border-gray-300">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#232323" strokeWidth="2" d="M12 5v14m7-7H5"/></svg>
        </button>
        <button className="bg-white rounded-full p-2 border border-gray-300" onClick={onScanClick}>
          <img src="/assets/yfk/icon/qr_code_scanner.png" alt="scan" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}