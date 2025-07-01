import Image from "next/image";

export default function HeaderHistoryPage({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-[#FFD823] w-full max-w-[470px] mx-auto pt-4 pb-4 px-4 z-10 relative rounded-none">
      <div className="flex items-center mb-3">
        <Image src="/assets/yfk/image/logo-item.png" alt="Logo" width={170} height={170} className="mr-2" />
      </div>
      <div className="text-black font-bold text-lg mb-1">History Pengantaran</div>
      <div className="text-black text-xs mb-3">Masukkan Kode Barcode atau scan barcode</div>
      {children}
    </div>
  );
}
