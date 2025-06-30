import BottomNavPage from "@/components/bottom-nav";
import HeaderPagePickup from "../../../../../features/pickup/components/HeaderPickupPage";
import DashboardTanggal from "../../../../../features/dashboard/components/DashboardTanggal";

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
export default function PickupPage() {
  return (
    <div className="min-h-screen bg-black bg-opacity-80 relative flex justify-center pb-24">
      <div className="w-full max-w-[375px] mx-auto">
       <HeaderPagePickup />
        {/* Tanggal */}
        <DashboardTanggal />
        {/* List Card */}
        <div className="flex flex-col gap-4 px-4">
          {pickupData.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#232323] rounded-2xl p-4 flex flex-col gap-2 shadow relative"
            >
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="24" height="35" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6"/></svg>
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
