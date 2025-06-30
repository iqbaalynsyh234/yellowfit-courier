export default function DeleteConfirmPage({ onCancel, onConfirm }: { onCancel?: () => void; onConfirm?: () => void }) {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <div className="font-bold text-xl text-black mb-2 text-center">Delete ?</div>
      <div className="text-center text-gray-500 mb-6 text-sm">
        Apakah kamu yakin akan Delete dari<br />Aplikasi?
      </div>
      <div className="flex gap-3 w-full">
        <button
          className="flex-1 border-2 border-[#FF5A5A] text-[#FF5A5A] font-bold rounded-xl py-2 text-base transition bg-white hover:bg-red-50"
          onClick={onCancel}
        >
          Batal
        </button>
        <button
          className="flex-1 bg-[#FF5A5A] hover:bg-red-600 text-white font-bold rounded-xl py-2 text-base transition"
          onClick={onConfirm}
        >
          Ya
        </button>
      </div>
    </div>
  );
}