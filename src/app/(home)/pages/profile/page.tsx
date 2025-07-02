"use client";

import BottomNavPage from "@/components/bottom-nav";
import { useRouter } from "next/navigation";
import HeaderProfilePage from "../../../../../features/profile/components/HeaderProfilePage";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/User";
import LogoutConfirm from "@/components/allert/LogoutConfirm";
import { logoutApi } from "@/lib/yellowfit-courier/api/BaseUrl";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    // console.log("userData:", userData);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.log("error:", e);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black pb-24 flex justify-center items-center">
        <div className="text-white">User belum login.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-24 flex justify-center">
      <div className="w-full max-w-[475px]">
        <HeaderProfilePage />
        <div className="px-4 mt-4">
          <div className="text-white font-bold mb-2">Data Diri</div>
          <div className="flex flex-col gap-3">
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">NIK</div>
              <div className="text-black/80 text-sm">{user.nik}</div>
            </div>
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Nama Lengkap</div>
              <div className="text-black/80 text-sm">{user.name}</div>
            </div>
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Tanggal Lahir</div>
              <div className="text-black/80 text-sm">{user.dob ? new Date(user.dob).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</div>
            </div>
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Alamat</div>
              <div className="text-black/80 text-sm">{user.address}</div>
            </div>
          </div>
          <div className="text-white font-bold mt-6 mb-2">Kontak</div>
          <div className="flex flex-col gap-3">
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Phone</div>
              <div className="text-black/60 text-sm">{user.phone}</div>
            </div>
            <div className="bg-[#F8F7F4] rounded-xl p-4">
              <div className="font-bold text-black text-sm mb-1">Email</div>
              <div className="text-black/60 text-sm">{user.email}</div>
            </div>
          </div>
          <button
            className="w-full bg-[#FF5A5A] hover:bg-red-600 text-white font-bold rounded-xl py-3 text-base mt-8 transition"
            onClick={() => setShowLogout(true)}
          >
            Logout
          </button>
        </div>
        <BottomNavPage />
        {showLogout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <LogoutConfirm
              onCancel={() => setShowLogout(false)}
              onConfirm={handleLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
}