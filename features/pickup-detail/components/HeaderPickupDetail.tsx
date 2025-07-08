import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface HeaderPickupDetailProps {
 onScanClick?: () => void;
 generateCode?: string;
}

const HeaderPickupDetail: React.FC<HeaderPickupDetailProps> = ({
 onScanClick,
 generateCode,
}) => {
 const router = useRouter();
 return (
  <div className='bg-[#FFD823] w-full max-w-[475px] mx-auto px-4 pt-4 pb-4 flex flex-col gap-2 rounded-none'>
   <div className='flex items-center gap-2 mb-2'>
    <button
     onClick={() => router.back()}
     className='p-2 rounded-full hover:bg-yellow-200 transition'
     aria-label='Kembali'>
     <svg
      width='27'
      height='27'
      fill='none'
      viewBox='0 0 24 24'>
      <path
       d='M15 19l-7-7 7-7'
       stroke='#232323'
       strokeWidth='2'
       strokeLinecap='round'
       strokeLinejoin='round'
      />
     </svg>
    </button>
    <div className='font-bold text-lg text-black tracking-wider flex-1'>
     {generateCode || ''}
    </div>
   </div>
   <div className='text-xs text-gray-700 mb-1'>
    Masukkan Kode Barcode atau scan barcode
   </div>
   <div className='flex items-center gap-2'>
    <input
     className='flex-1 rounded-full px-4 h-12 text-black bg-white border border-gray-300 focus:outline-none'
     placeholder='1668091'
     defaultValue='1668091'
    />
    <button className='bg-white rounded-full p-2 h-12 w-12 flex items-center justify-center border border-gray-300'>
     <svg
      width='22'
      height='22'
      fill='none'
      viewBox='0 0 24 24'>
      <path
       stroke='#232323'
       strokeWidth='2'
       d='M12 5v14m7-7H5'
      />
     </svg>
    </button>
    <button
     className='bg-white rounded-full p-2 h-12 w-12 flex items-center justify-center border border-gray-300'
     onClick={onScanClick}
     aria-label='Scan QR/barcode'>
     <Image
      src='/assets/yfk/icon/qr_code_scanner.png'
      alt='scan'
      width={24}
      height={24}
      className='w-6 h-6'
     />
    </button>
   </div>
  </div>
 );
};

export default HeaderPickupDetail;
