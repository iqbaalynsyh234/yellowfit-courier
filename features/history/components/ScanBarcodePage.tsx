import React from 'react';
import Image from 'next/image';

interface ScanBarcodePageProps {
 value: string;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onScanClick?: () => void;
 onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ScanBarcodePage({
 value,
 onChange,
 onScanClick,
 onKeyPress,
}: ScanBarcodePageProps) {
 return (
  <div className='w-full max-w-[475px] bg-[#FFD823] px-4 pt-6 pb-4 relative z-10'>
   <div className='flex items-center mb-2'>
    <Image
     src='/assets/yfk/image/logo-item.png'
     alt='Logo'
     width={170}
     height={180}
     className='mr-2'
    />
   </div>
   <div className='text-black font-bold text-lg mb-1'>History Pengantaran</div>
   <div className='text-black text-sm mb-3'>
    Masukkan Kode Barcode atau scan barcode
   </div>
   <div className='flex items-center bg-white rounded-xl px-3 py-2 shadow'>
    <input
     type='text'
     className='flex-1 bg-transparent outline-none text-black placeholder-gray-400 text-sm'
     placeholder='Masukkan Barcode / Nama'
     value={value}
     onChange={onChange}
     onKeyPress={onKeyPress}
    />
    <button
     onClick={onScanClick}
     type='button'>
     <svg
      width='20'
      height='20'
      fill='none'
      viewBox='0 0 24 24'>
      <circle
       cx='11'
       cy='11'
       r='8'
       stroke='#FFD823'
       strokeWidth='2'
      />
      <path
       d='M21 21l-4.35-4.35'
       stroke='#FFD823'
       strokeWidth='2'
       strokeLinecap='round'
      />
     </svg>
    </button>
   </div>
  </div>
 );
}
