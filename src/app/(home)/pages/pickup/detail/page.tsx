"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNavPage from "@/components/bottom-nav";
import ScanQrcode from "@/components/scan/ScanQrcode";
import DetailPengiriman from "@/components/DetailPengiriman";
import HeaderPickupDetail from "@/../features/pickup-detail/components/HeaderPickupDetail";
import { getPickupDetailByGenerateCode, PickupDetailResponse } from "@/lib/yellowfit-courier/api/pickup-detail/pickupdetail";

export default function PickupDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const generate_code = searchParams.get("generate_code") || "";
  const tanggal = searchParams.get("tanggal") || "";

  const [detail, setDetail] = useState<PickupDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!generate_code || !tanggal) return;
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const res = await getPickupDetailByGenerateCode(generate_code, tanggal, token);
      setDetail(res);
      setLoading(false);
    };
    fetchDetail();
  }, [generate_code, tanggal]);

  if (loading) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  // Data utama dari API: detail?.data?.data (array)
  const boxList = Array.isArray(detail?.data?.data) ? detail.data.data : [];

  return (
    <div className="min-h-screen bg-black bg-opacity-80 relative flex justify-center pb-24">
      <div className="w-full max-w-[470px] mx-auto">
        <HeaderPickupDetail onScanClick={() => setShowCamera(true)} generateCode={generate_code} />
        <div className="py-4 mt-2">
          <div className="font-bold text-white text-base mb-2">
            {boxList.length} Box <span className="font-normal text-gray-400">Pickup Pengantaran</span>
          </div>
          {boxList.map((item: any, idx: number) => {
            const isOpen = false; // Atur expand/collapse sesuai kebutuhan
            return (
              <div
                key={item.id}
                className={`bg-[#232323] rounded-2xl p-4 flex flex-col gap-2 shadow relative mb-4 transition border-2 ${isOpen ? "border-yellow-400" : "border-transparent"} cursor-pointer`}
                // onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <span className="absolute right-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1 bg-[#FFB37C] text-white text-xs font-bold rounded-full px-3 py-1 shadow">
                    <span className="inline-block w-4 h-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#FFB37C"/><path d="M12 7v5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
                    </span>
                    {/* Ganti dengan status dari API jika ada */}
                    {item.status || "Dalam Pengantaran"}
                  </span>
                </span>
                <span className="inline-block text-white text-xs font-bold rounded-full px-3 py-1 mb-1 w-fit">
                  # {item.id}
                </span>
                <div className="text-white font-bold text-lg tracking-wide">{item.name || item.penerima || "-"}</div>
                <div className="text-gray-300 text-sm">{item.address || item.alamat || "-"}</div>
                {/* Tambahkan tombol detail/dll jika perlu */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed z-50 w-full max-w-[475px] left-1/2 -translate-x-1/2 bottom-4 mt-2">
        <BottomNavPage />
      </div>
      {showCamera && (
        <ScanQrcode onClose={() => setShowCamera(false)} />
      )}
      {showDetail && detailData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
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

