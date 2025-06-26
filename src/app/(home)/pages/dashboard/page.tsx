"use client";

import BottomNavPage from "@/components/bottom-nav";
import Image from "next/image";
import { useState } from "react";
import AllertPage from "@/components/Allert";
import CameraModalPages from "@/components/CameraModal";
import DetailPengiriman from "@/components/DetailPengiriman";
import QrCodePage from "@/components/scan/ScanQrcode";

export default function DashboardPage() {
  const [orders, setOrders] = useState([
    { id: 1, berangkat: false, showActions: false },
    { id: 2, berangkat: false, showActions: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [showScan, setShowScan] = useState(false);

  const handleBerangkat = (id: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, berangkat: true } : order
      )
    );
    setShowModal(true);
  };

  const toggleShowActions = (id: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, showActions: !order.showActions } : order
      )
    );
  };

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
    detailData ? (
      <div className="relative min-h-screen w-full">
        {/* Konten utama, z-10 */}
        <div className="relative z-10 flex flex-col items-center min-h-screen justify-between">
          <DetailPengiriman
            paketId={detailData.paketId}
            alamat={detailData.alamat}
            penerima={detailData.penerima}
            telepon={detailData.telepon}
            paket={detailData.paket}
            onClose={() => setDetailData(null)}
          />
          <div className="flex-1" />
        </div>
      </div>
    ) : (
      <div className="min-h-screen w-full bg-black relative flex flex-col items-center pb-20 overflow-hidden">
        <div
          className="absolute"
          style={{
            width: 375,
            height: 812,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.8,
            zIndex: 0,
          }}
        >
          <Image
            src="/assets/yfk/image/bg-img.png"
            alt="Background"
            width={475}
            height={912}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 1,
            }}
          />
        </div>

        {/* Header Kuning */}
        <div className="w-full max-w-[375px] bg-[#FFD823] rounded-b-3xl px-4 pt-6 pb-4 z-10 relative">
          <div className="flex items-center mb-2">
            <Image src="/assets/yfk/image/logo-item.png" alt="Logo" width={205} height={205} className="mr-2" />
          </div>
          <div className="text-black font-bold text-sm leading-tight">A</div>
          <div className="text-black text-xs mb-3">089652729286</div>
          <div className="flex items-center bg-white rounded-lg px-3 py-2">
            <input
              type="text"
              placeholder="Barcode / Nama Customer"
              className="flex-1 bg-transparent outline-none text-black text-sm"
            />
            <button className="ml-2" onClick={() => setShowScan(true)}>
              <img 
                src="/assets/yfk/icon/qr_code_scanner.png" 
                alt="QR Code Scanner" 
                width="70" 
                height="70"
                className="w-7 h-7"
              />
            </button>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="w-full max-w-[375px] flex-1 px-4 pt-4 relative z-10">
          <>
            <div className="text-white font-bold text-lg mb-2 mt-2">Senin, 12 Februari 2024</div>
            <div className="flex bg-gray-900 rounded-full py-2 px-2 mb-4 justify-between">
              <div className="flex-1 text-center text-white text-xs">
                <div className="font-bold text-base">30</div>
                Tugas
              </div>
              <div className="flex-1 text-center text-yellow-400 text-xs">
                <div className="font-bold text-base">25</div>
                Pickup
              </div>
              <div className="flex-1 text-center text-white text-xs">
                <div className="font-bold text-base">0</div>
                Selesai
              </div>
            </div>
            {orders.map((order, idx) => (
              <div key={order.id} className="bg-gray-800 rounded-xl p-4 mb-3 shadow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400 font-mono">#1668091</span>
                  <span className="bg-orange-200 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">Dalam Pengantaran</span>
                  <button
                    className="ml-2"
                    onClick={() => toggleShowActions(order.id)}
                    aria-label={order.showActions ? "Sembunyikan aksi" : "Tampilkan aksi"}
                  >
                    {order.showActions ? (
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M6 15l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="font-bold text-white text-sm mb-1">Angelica Theresia</div>
                <div className="text-xs text-gray-300 mb-1">Pademangan timur 4 gang 32 komplek duta kemayoran blok</div>
                {order.showActions && (
                  <>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-xl text-sm">Hubungi Customer</button>
                      <button
                        className="flex-1 bg-[#FFD823] text-black font-semibold py-2 rounded-xl text-sm"
                        onClick={() => setShowCameraModal(true)}
                      >
                        Foto Pengantaran
                      </button>
                    </div>
                    {!order.berangkat && idx === 0 && (
                      <button
                        className="w-full bg-[#FFD823] text-black font-bold py-4 rounded-xl text-center text-base shadow-lg mt-4 mb-2"
                        onClick={() => handleBerangkat(order.id)}
                      >
                        Berangkat Sekarang
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </>
        </div>
        <AllertPage
          show={showModal}
          onClose={() => setShowModal(false)}
        />
        {showCameraModal && !detailData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-[375px]">
              <CameraModalPages 
                onClose={() => setShowCameraModal(false)}
                onSave={(data) => {
                  setDetailData(data);
                  setShowCameraModal(false);
                }}
              />
              <button
                className="absolute top-3 right-3 bg-gray-200 text-black px-3 py-1 rounded-lg text-xs z-20"
                onClick={() => setShowCameraModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
        <BottomNavPage />
      </div>
    )
  );
}
