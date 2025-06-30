"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import BottomNavPage from "@/components/bottom-nav";
import ScanQrcode from "@/components/scan/ScanQrcode";
import DetailPengiriman from "@/components/DetailPengiriman";
import HeaderPickupDetail from "@/../features/pickup-detail/components/HeaderPickupDetail";

const boxList = [
  {
    id: "1668091",
    status: "Dalam Pengantaran",
    name: "Angelica Theresia",
    address: "Pademangan timur 4 gang 32 komplek duta kemayoran blok",
  },
  {
    id: "1668092",
    status: "Dalam Pengantaran",
    name: "Angelica Theresia",
    address: "Pademangan timur 4 gang 32 komplek duta kemayoran blok",

  },
  {
    id: "1668093",
    status: "Dalam Pengantaran",
    name: "Angelica Theresia",
    address: "Pademangan timur 4 gang 32 komplek duta kemayoran blok",

  },
];

export default function PickupDetailPage() {
  const router = useRouter();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-black bg-opacity-80 relative flex justify-center pb-24">
      <div className="w-full max-w-[375px] mx-auto">
        <HeaderPickupDetail onScanClick={() => setShowCamera(true)} />
        <div className="py-4">
          <div className="font-bold text-white text-base mb-2">
            32 Box <span className="font-normal text-gray-400">Pickup Pengantaran</span>
          </div>
          {boxList.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.id}
                className={`bg-[#232323] rounded-2xl p-4 flex flex-col gap-2 shadow relative mb-4 transition border-2 ${isOpen ? "border-yellow-400" : "border-transparent"} cursor-pointer`}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <span className="absolute right-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1 bg-[#FFB37C] text-white text-xs font-bold rounded-full px-3 py-1 shadow">
                    <span className="inline-block w-4 h-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#FFB37C"/><path d="M12 7v5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
                    </span>
                    {item.status}
                  </span>
                </span>
                {/* Icon expand/collapse */}
                <span className="absolute right-4 top-12 text-gray-400">
                  <svg width="24" height="35" fill="none" viewBox="0 0 24 24">
                    <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 15l6-6 6 6" : "M9 6l6 6-6 6"} />
                  </svg>
                </span>
                <span className="inline-block  text-white text-xs font-bold rounded-full px-3 py-1 mb-1 w-fit">
                  # {item.id}
                </span>
                <div className="text-white font-bold text-lg tracking-wide">{item.name}</div>
                <div className="text-gray-300 text-sm">{item.address}</div>
                {isOpen && (
                  <div className="flex gap-2 mt 3">
                    <button className="flex-1 bg-[#FFD823] text-black font-bold rounded-full py-2" onClick={e => {e.stopPropagation(); setDetailData(item); setShowDetail(true);}}>Detail Pengiriman</button>
                    <button className="flex-1 bg-[#FF5A5A] text-white font-bold rounded-full py-2">Delete</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed z-50 w-full max-w-[375px] left-1/2 -translate-x-1/2 bottom-4">
        <BottomNavPage />
      </div>
      {showCamera && (
        <ScanQrcode onClose={() => setShowCamera(false)} />
      )}
      {showDetail && detailData && (
        <div className="fixed inset-0 z-50 flex items-center jfalsey-center bg-black bg-opacity-80">
          <DetailPengiriman
            paketId={`#${detailData.id}`}
            alamat={detailData.address}
            penerima={detailData.name}
            telepon="082271153305"
            paket="1 Box - Lunch Weighloss"
            onClose={() => setShowDetail(false)}
          />
        </div>
      )}
    </div>
  );
}
