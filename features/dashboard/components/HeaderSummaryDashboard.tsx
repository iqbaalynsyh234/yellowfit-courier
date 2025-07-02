interface HeaderSummaryDashboardProps {
  tugas?: string;
  pickup?: string;
  selesai?: string;
}

export default function HeaderSummaryDashboard({ 
  tugas = "30", 
  pickup = "25", 
  selesai = "0" 
}: HeaderSummaryDashboardProps) {
  return (
    <div className="flex bg-gray-900 rounded-full py-2 px-2 mb-4 justify-between">
      <div className="flex-1 text-center text-white text-xs">
        <div className="font-bold text-base">{tugas}</div>
        Tugas
      </div>
      <div className="flex-1 text-center text-yellow-400 text-xs">
        <div className="font-bold text-base">{pickup}</div>
        Pickup
      </div>
      <div className="flex-1 text-center text-white text-xs">
        <div className="font-bold text-base">{selesai}</div>
        Selesai
      </div>
    </div>
  );
}