export default function ErrorLogin({ message, onBack }: { message: string, onBack: () => void }) {
  return (
    <div
      style={{
        width: 295,
        height: 239,
        top: 5,
        left: 5,
        borderRadius: 19,
        position: 'relative',
      }}
      className="mx-auto bg-white shadow-lg p-6 flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-[#FF6B6B] flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#FF6B6B" />
          <text x="16" y="22" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="bold">!</text>
        </svg>
      </div>
      <div className="font-bold text-xl text-black mb-2 text-center">Nomor Tidak Terdaftar di Sistem</div>
      <div className="text-center text-black/80 mb-6 text-sm">
        {message}
      </div>
      <button
        className="w-full bg-[#FFD823] hover:bg-yellow-400 text-black font-semibold rounded-xl py-3 text-base transition"
        onClick={onBack}
      >
        Kembali
      </button>
    </div>
  );
}