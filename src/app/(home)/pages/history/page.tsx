"use client";

import BottomNavPage from "@/components/bottom-nav";
import { useState } from "react";
import DetailPengiriman from "@/components/DetailPengiriman";
import ScanBarcodePage from "../../../../../features/history/components/ScanBarcodePage";
import HeaderHistoryPage from '../../../../../features/history/components/HeaderHistoryPage';

const dummyHistory = [
  {
    id: "1668091",
    nama: "Angelica Theresia",
    alamat: "Pademangan timur 4 gang 32 komplek duta kemayoran blok",
    status: "Selesai",
    telepon: "08123456789",
    paket: "Box Lunch 1"
  },
  {
    id: "1668092",
    nama: "Budi Santoso",
    alamat: "Jl. Melati No. 10, Jakarta",
    status: "Selesai",
    telepon: "08198765432",
    paket: "Box Dinner 2"
  },
];

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [detailData, setDetailData] = useState<any>(null);

  if (detailData) {
    return (
      <div className="min-h-screen w-full bg-black relative flex flex-col items-center pb-20 overflow-hidden">
        <DetailPengiriman
          paketId={detailData.id}
          alamat={detailData.alamat}
          penerima={detailData.nama}
          telepon={detailData.telepon}
          paket={detailData.paket}
          onClose={() => setDetailData(null)}
        />
        <BottomNavPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center pb-20 overflow-hidden bg-black">
      <div className="relative w-full max-w-[475px] flex-1 flex flex-col items-center">
        <img
          src="/assets/yfk/image/bg-img.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: "none" }}
        />
        <div className="relative z-10 w-full flex flex-col items-center">
          <ScanBarcodePage
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="w-full flex-1 px-4 pt-4">
            {dummyHistory.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#232323] rounded-2xl p-4 flex flex-col gap-2 shadow relative mb-4"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400 font-mono"># {item.id}</span>
                    <span className="bg-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ml-auto">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#3AC0A0"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                      Selesai
                    </span>
                    <button className="ml-2" onClick={() => setOpenIdx(isOpen ? null : idx)} aria-label={isOpen ? "Sembunyikan detail" : "Tampilkan detail"}>
                      {isOpen ? (
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 15l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : (
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                    </button>
                  </div>
                  <div className="font-bold text-white text-sm mb-1">{item.nama}</div>
                  <div className="text-xs text-gray-300 mb-1">{item.alamat}</div>
                  {isOpen && (
                    <button className="w-full bg-[#FFD823] text-black font-bold py-3 rounded-xl text-center text-base shadow-lg mt-2" onClick={() => setDetailData(item)}>
                      Detail Pengiriman
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <BottomNavPage />
    </div>
  );
} 