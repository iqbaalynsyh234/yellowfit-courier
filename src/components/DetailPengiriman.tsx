import Image from 'next/image';
import { useState } from 'react';

interface DetailPengirimanProps {
 paketId: string;
 alamat: string;
 penerima: string;
 telepon: string;
 paket: string;
 datacustomer?: {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  phone_clr: string;
 };
 onHubungiCustomer?: () => void;  
 onClose?: () => void;
}

export default function DetailPengiriman({
 paketId,
 alamat,
 penerima,
 telepon,
 paket,
 datacustomer,
 onHubungiCustomer,
 onClose,
}: DetailPengirimanProps) {
 const [copied, setCopied] = useState(false);

 const handleCopy = () => {
  navigator.clipboard.writeText(paketId);
  setCopied(true);
  setTimeout(() => setCopied(false), 1200);
 };

 return (
  <div className='w-full max-w-[475px] mx-auto flex flex-col min-h-screen relative'>
   {onClose && (
    <button
     className='absolute top-3 right-4 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 shadow'
     onClick={onClose}
     aria-label='Tutup'>
     <svg
      width='18'
      height='18'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
       d='M6 6L14 14M14 6L6 14'
       stroke='black'
       strokeWidth='2'
       strokeLinecap='round'
      />
     </svg>
    </button>
   )}

   <div className='bg-[#FFD823] px-5 py-5 flex items-center justify-center w-full'>
    <span className='font-bold text-black text-base'>Detail Pengiriman</span>
   </div>
   {/* Konten */}
   <div className='text-white text-sm px-4 pb-6 pt-4'>
    {/* Paket ID */}
    <div className='flex items-center border-b border-gray-700 pb-2 mb-2'>
     <span className='mr-2'>Paket ID:</span>
     <span className='font-bold mr-2'>{paketId}</span>
     <button
      onClick={handleCopy}
      className='focus:outline-none'>
      <svg
       width='18'
       height='18'
       fill='none'
       viewBox='0 0 24 24'>
       <rect
        x='9'
        y='9'
        width='13'
        height='13'
        rx='2'
        stroke='#FFD823'
        strokeWidth='2'
       />
       <rect
        x='3'
        y='3'
        width='13'
        height='13'
        rx='2'
        stroke='#FFD823'
        strokeWidth='2'
       />
      </svg>
     </button>
     {copied && (
      <span className='ml-2 text-xs text-[#FFD823] font-semibold animate-pulse'>
       Disalin!
      </span>
     )}
    </div>
    {/* Alamat */}
    <div className='border-b border-gray-700 pb-2 mb-2'>
     <span className='block text-xs text-gray-300 mb-1'>Alamat</span>
     <span className='block text-xs text-white whitespace-pre-line'>
      {alamat}
     </span>
    </div>
    {/* Penerima */}
    <div className='flex items-center border-b border-gray-700 pb-2 mb-2'>
     <span className='text-xs text-gray-300 mr-2'>Penerima :</span>
     <span className='text-white text-sm font-semibold'>{penerima}</span>
    </div>
    {/* Telepon */}
    <div className='flex items-center border-b border-gray-700 pb-2 mb-2'>
     <span className='text-xs text-gray-300 mr-2'>Telepon</span>
     <span className='text-white text-sm'>
      {datacustomer?.phone || telepon}
     </span>
    </div>
    {/* Paket */}
    <div className='flex items-center border-b border-gray-700 pb-4 mb-4'>
     <span className='text-xs text-gray-300 mr-2'>Paket</span>
     <span className='text-white text-sm font-semibold'>{paket}</span>
    </div>
    {/* Tombol Hubungi Customer */}
    <button
     className='w-full border border-green-500 text-green-500 font-semibold py-2 rounded-xl text-base hover:bg-green-50 transition'
     onClick={() => {
      if (datacustomer?.phone_clr) {
       window.open(`https://wa.me/${datacustomer.phone_clr}`, '_blank');
      } else if (onHubungiCustomer) {
       onHubungiCustomer();
      }
     }}>
     Hubungi Customer
    </button>
   </div>
   <Image
    src='/assets/yfk/image/bg-img.png'
    alt='Background'
    width={676}
    height={543}
    className='object-cover'
    style={{ width: 776, height: 743 }}
   />
  </div>
 );
}
