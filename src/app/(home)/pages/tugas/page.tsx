"use client";

import BottomNavPage from "@/components/bottom-nav";
import Image from "next/image";
import { useState, useEffect } from "react";
import HeaderDashboardPage from "../../../../../features/dashboard/components/HeaderDashbord";


const dummyTugas = [
  {
    id: 1,
    sesi: "L",
    label: "LUNCH",
    kode: "TGS-001",
    customer: "Angelica Theresia",
    alamat: "Pademangan timur 4 gang 32 komplek duta kemayoran blok",
    tanggal: "2024-06-10",
  },
  {
    id: 2,
    sesi: "D",
    label: "DINNER",
    kode: "TGS-002",
    customer: "Angelica Theresia",
    alamat: "Pademangan timur 4 gang 32 komplek duta kemayoran blok",
    tanggal: "2024-06-10",
  },
  {
    id: 3,
    sesi: "L",
    label: "LUNCH",
    kode: "TGS-003",
    customer: "Angelica Theresia",
    alamat: "Pademangan timur 4 gang 32 komplek duta kemayoran blok",
    tanggal: "2024-06-10",
  },
];

export default function TugasCourierPage() {
  const [tugasList] = useState(dummyTugas);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }));
  }, []);

  return (
    <div className="min-h-screen w-full bg-black relative pb-20 overflow-hidden">
      <div
        className="absolute"
        style={{
          width: 470,
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
      <div className="w-full max-w-[475px] flex-1 px-4 pt-4 relative z-10 mx-auto flex flex-col">
        <HeaderDashboardPage />
        <div className="text-white font-bold text-lg mb-2 mt-2">{currentDate}</div>
        {tugasList.length === 0 ? (
          <div className="text-gray-400 text-center mt-8">Tidak ada tugas hari ini.</div>
        ) : (
          tugasList.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-xl p-4 mb-3 shadow">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400 font-mono">#{item.kode}</span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    item.sesi === "L"
                      ? "bg-[#FFD823] text-black"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <div className="font-bold text-white text-sm mb-1">{item.customer}</div>
              <div className="text-xs text-gray-300 mb-1">{item.alamat}</div>
            </div>
          ))
        )}
      </div>
      <BottomNavPage />
    </div>
  );
}