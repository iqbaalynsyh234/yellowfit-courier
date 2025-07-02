import Image from "next/image";

export default function SuccesLoginPage() {
  return (
     <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/assets/yfk/image/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="mb-4"
          />
          <h1 className="text-2xl font-bold mb-4">Login Berhasil</h1>
          <p className="text-gray-600 mb-8">Selamat datang di YellowFitKitchen</p>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              window.location.href = "/pages/dashboard";
            }}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}