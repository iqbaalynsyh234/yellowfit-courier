export default function ErrorCameraPage({ onEnableCamera }: { onEnableCamera?: () => void }) {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <div className="w-14 h-14 rounded-full bg-[#FF6B6B] flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#FF6B6B" />
          <text x="16" y="22" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="bold">!</text>
        </svg>
      </div>
      <div className="font-bold text-xl text-black mb-2 text-center">Aktifkan Kamera!</div>
      <div className="text-center text-black/80 mb-6 text-sm">
        Untuk melakukan Absensi, Anda perlu<br />mengaktifkan kamera.
      </div>
      <button
        className="w-full bg-[#FFD823] hover:bg-yellow-400 text-black font-semibold rounded-xl py-3 text-base transition"
        onClick={onEnableCamera}
      >
        Aktifkan Kamera
      </button>
    </div>
  );
}