interface AllertPageProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}
export default function AllertPage({
  show,
  onClose,
  title = "Pickup Berhasil",
  message = "Paket ini berhasil ditambahkan di pengantaran kamu",
  buttonText = "Kirim Pesan ke Customer",
  onButtonClick,
}: AllertPageProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-xs flex flex-col items-center shadow-xl">
        <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path d="M6 12l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="font-bold text-lg text-center mb-1">{title}</div>
        <div className="text-gray-700 text-center mb-4 text-sm">{message}</div>
        <button
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-xl text-sm"
          onClick={() => {
            onButtonClick && onButtonClick();
            onClose();
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}