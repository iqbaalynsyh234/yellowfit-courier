export default function DashboardTanggal() {
  const getToday = () => {
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const now = new Date();
    return `${hari[now.getDay()]}, ${now.getDate()} ${bulan[now.getMonth()]} ${now.getFullYear()}`;
  };

  return (
    <div className="px-4 pt-6 pb-2">
      <h3 className="text-white font-bold text-lg">{getToday()}</h3>
    </div>
  );
}
