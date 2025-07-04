'use client';

import { useState, useEffect } from 'react';
import BottomNavPage from '@/components/bottom-nav';
import HeaderPagePickup from '../../../../../features/pickup/components/HeaderPickupPage';
import DashboardTanggal from '../../../../../features/dashboard/components/DashboardTanggal';
import { useRouter } from 'next/navigation';
import { usePickupList } from '@/hooks/usePickupList';
import { getPickupDetailByGenerateCode } from '@/lib/yellowfit-courier/api/pickup-detail/pickupdetail';
import Image from 'next/image';

export default function PickupPage() {
 const router = useRouter();
 const [tanggal] = useState<string>('2025-07-01'); // format yyyy-mm-dd
 const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
 const { pickupData, loading, error } = usePickupList(tanggal, token);

 const getSessionType = (sesi: string) => {
  switch (sesi) {
   case 'L':
    return 'LUNCH';
   case 'D':
    return 'DINNER';
   default:
    return sesi;
  }
 };

 const handleDetail = async (generate_code: string, tanggal: string) => {
  const token = localStorage.getItem('token') || '';
  const detail = await getPickupDetailByGenerateCode(
   generate_code,
   tanggal,
   token
  );
  router.push(
   `/pages/pickup/detail?generate_code=${encodeURIComponent(
    generate_code
   )}&tanggal=${encodeURIComponent(tanggal)}`
  );
 };

 if (loading) {
  return (
   <div className='min-h-screen bg-black bg-opacity-80 relative pb-24 flex justify-center items-center overflow-hidden'>
    <div className='text-white text-lg'>Loading...</div>
   </div>
  );
 }

 if (error) {
  return (
   <div className='min-h-screen bg-black bg-opacity-80 relative pb-24 flex justify-center items-center overflow-hidden'>
    <div className='text-red-500 text-lg'>{error}</div>
   </div>
  );
 }

 return (
  <div className='min-h-screen bg-black bg-opacity-80 relative pb-24 flex justify-center overflow-hidden'>
   <div className='w-full max-w-[475px] mx-auto relative z-10 overflow-hidden'>
    <Image
     src='/assets/yfk/image/bg-img.png'
     alt='Background'
     width={475}
     height={912}
     className='absolute inset-0 w-full h-full object-cover z-0'
     style={{ pointerEvents: 'none' }}
     priority
    />
    <div className='relative z-10'>
     <HeaderPagePickup />
     <DashboardTanggal />
     <div className='flex flex-col gap-4 px-4'>
      {Array.isArray(pickupData) && pickupData.length === 0 ? (
       <div className='text-white text-center py-8'>
        No pickup data available
       </div>
      ) : (
       pickupData.map((item) => (
        <div
         key={item.id}
         className='bg-[#232323] rounded-2xl p-4 flex flex-col gap-2 shadow relative cursor-pointer'
         onClick={() => handleDetail(item.generate_code, item.tanggal)}>
         <span className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'>
          <svg
           width='24'
           height='35'
           fill='none'
           viewBox='0 0 24 24'>
           <path
            stroke='#fff'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 6l6 6-6 6'
           />
          </svg>
         </span>
         <span className='inline-block bg-[#FFD823] text-black text-xs font-bold rounded-full px-3 py-1 mb-1 w-fit'>
          {getSessionType(item.sesi)}
         </span>
         <div className='text-white font-bold text-lg tracking-wide'>
          {item.generate_code}
         </div>
         <div className='text-gray-300 text-sm'>{item.namacabang}</div>
         <div className='text-gray-400 text-xs'>{item.tanggal}</div>
        </div>
       ))
      )}
     </div>
    </div>
   </div>
   <div className='fixed z-50 w-full max-w-[470px] left-1/2 -translate-x-1/2 bottom-4'>
    <BottomNavPage />
   </div>
  </div>
 );
}
