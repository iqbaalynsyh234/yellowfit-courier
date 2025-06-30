"use client";

import BottomNavPage from "@/components/bottom-nav";
import { useRouter } from "next/navigation";
import HeaderProfilePage from "../../../../../features/profile/components/HeaderProfilePage";

export default function ProfilePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black pb-24 flex justify-center">
      <div className="w-full max-w-[375px]">
        <HeaderProfilePage />

        <div className="px-4 mt-4">
          <div className="text-white font-bold mb-2">Data Diri</div>
          <div className="flex flex-col gap-3">
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">NIK</div>
              <div className="text-black/80 text-sm">1170001</div>
            </div>
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Nama Lengkap</div>
              <div className="text-black/80 text-sm">Asrul Ramadhan</div>
            </div>
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Tanggal Lahir</div>
              <div className="text-black/80 text-sm">01 Februari 1995</div>
            </div>
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Alamat</div>
              <div className="text-black/80 text-sm">Jl. Bontomene 1 No 8, Rappocini Kota Makassar</div>
            </div>
          </div>
          <div className="text-white font-bold mt-6 mb-2">Kontak</div>
          <div className="flex flex-col gap-3">
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Phone</div>
              <div className="text-black/60 text-sm">082271153305</div>
            </div>
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Email</div>
              <div className="text-black/60 text-sm">asroel.dev@gmail.com</div>
            </div>
          </div>
          {/* Tombol Logout */}
          <button className="w-full bg-[#FF5A5A] hover:bg-red-600 text-white font-bold rounded-xl py-3 text-base mt-8 transition">
            Logout
          </button>
        </div>
        <BottomNavPage />
      </div>
    </div>
  );
}