import Image from "next/image";
import BottomNavPage from "@/components/bottom-nav";

const pickupData = [
  {
    type: "LUNCH",
    code: "GRK1L120240207091800",
    location: "YFK JABODEBEK",
  },
  {
    type: "DINNER",
    code: "GRK1L120240207091800",
    location: "YFK JABODEBEK",
  },
];

function getToday() {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const now = new Date();
  return `${hari[now.getDay()]}, ${now.getDate()} ${bulan[now.getMonth()]} ${now.getFullYear()}`;
}

export default function PickupPage() {
  return (
    <div className="min-h-screen bg-black bg-opacity-80 relative flex justify-center pb-24">
      <div className="w-full max-w-[375px] mx-auto">
        {/* Header Kuning */}
        <div className="bg-[#FFD823] px-5 py-4 flex flex-col gap-2 rounded-none min-h-[100px]">
          <div className="flex items-center gap-2">
            <Image src="/assets/yfk/image/logo-item.png" alt="Logo" width={210} height={210} />
          </div>
          <div>
            <h2 className="font-bold text-xl text-black">Pickup Pengantaran</h2>
            <p className="text-black text-sm">Masukkan Kode Barcode atau scan barcode</p>
          </div>
        </div>

        {/* Tanggal */}
        <div className="px-4 pt-6 pb-2">
          <h3 className="text-white font-bold text-lg">{getToday()}</h3>
        </div>

        {/* List Card */}
        <div className="flex flex-col gap-4 px-4">
          {pickupData.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#232323] rounded-2xl p-4 flex flex-col gap-2 shadow relative"
            >
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6"/></svg>
              </span>
              <span className="inline-block bg-[#FFD823] text-black text-xs font-bold rounded-full px-3 py-1 mb-1 w-fit">
                {item.type}
              </span>
              <div className="text-white font-bold text-lg tracking-wide">{item.code}</div>
              <div className="text-gray-300 text-sm">{item.location}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Navigation */}
      <div className="fixed z-50 w-full max-w-[375px] left-1/2 -translate-x-1/2 bottom-4">
        <BottomNavPage />
      </div>
    </div>
  );
}
