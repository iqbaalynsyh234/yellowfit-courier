import React from "react";

interface OtpErrorAlertProps {
  message?: string;
  onClose: () => void;
}

const OtpErrorAlert: React.FC<OtpErrorAlertProps> = ({ message = "Kode verifikasi anda salah, silahkan masukan ulang", onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full flex flex-col items-center">
        <div className="text-red-600 font-bold text-lg mb-2">OTP Salah</div>
        <div className="text-gray-700 text-center mb-4">{message}</div>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default OtpErrorAlert; 