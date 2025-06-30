import Image from "next/image";

export default function HeaderPagePickup() {
  return (
    <div className="bg-[#FFD823] w-full px-0 py-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 px-5">
        <Image src="/assets/yfk/image/logo-item.png" alt="Logo" width={210} height={210} />
      </div>
      <div className="px-5">
        <h2 className="font-bold text-xl text-black">Pickup Pengantaran</h2>
        <p className="text-black text-sm">Masukkan Kode Barcode atau scan barcode</p>
      </div>
    </div>
  );
}
