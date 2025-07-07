'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import BottomNavPage from '@/components/bottom-nav';
import ScanQrcode from '@/components/scan/ScanQrcode';
import DetailPengiriman from '@/components/DetailPengiriman';
import HeaderPickupDetail from '@/../features/pickup-detail/components/HeaderPickupDetail';
import { getPickupDetailByGenerateCode } from '@/lib/yellowfit-courier/api/pickup-detail/pickupdetail';
import { PickupDetailResponse, PickupBox } from '@/interfaces/PickupDetail';

function LoadingState() {
 return (
  <div className='min-h-screen bg-black bg-opacity-80 flex items-center justify-center'>
   <div className='text-white text-center'>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4'></div>
    Loading...
   </div>
  </div>
 );
}

function PickupDetailContent() {
 const searchParams = useSearchParams();
 const generate_code = searchParams.get('generate_code') || '';
 const tanggal = searchParams.get('tanggal') || '';

 const [detail, setDetail] = useState<PickupDetailResponse | null>(null);
 const [loading, setLoading] = useState(true);
 const [showCamera, setShowCamera] = useState(false);
 const [showDetail, setShowDetail] = useState(false);

 useEffect(() => {
  const fetchDetail = async () => {
   if (!generate_code || !tanggal) return;
   setLoading(true);
   try {
    const token = localStorage.getItem('token') || '';
    const res = await getPickupDetailByGenerateCode(
     generate_code,
     tanggal,
     token
    );
    setDetail(res);
   } catch (error) {
    console.error('Error fetching pickup detail:', error);
   } finally {
    setLoading(false);
   }
  };
  fetchDetail();
 }, [generate_code, tanggal]);

 if (loading) {
  return <LoadingState />;
 }

 const boxList: PickupBox[] = Array.isArray(detail?.data?.data)
  ? detail.data.data
  : [];

 const selectedBox = detail?.data?.data?.[0];

 return (
  <div className='min-h-screen bg-black bg-opacity-80 relative flex justify-center pb-24'>
   <div className='w-full max-w-[470px] mx-auto'>
    <HeaderPickupDetail
     onScanClick={() => setShowCamera(true)}
     generateCode={generate_code}
    />
    <div className='py-4 mt-2'>
     <div className='font-bold text-white text-base mb-2'>
      {boxList.length} Box{' '}
      <span className='font-normal text-gray-400'>Pickup Pengantaran</span>
     </div>
     {boxList.map((item: PickupBox) => {
      let badgeColor = 'bg-gray-400';
      let badgeLabel = 'Belum Pickup';
      if (item.sts_kirim?.toString() === '1') {
       badgeColor = 'bg-green-500';
       badgeLabel = 'Selesai';
      } else if (item.sts_kirim?.toString() === '0' && item.kurirdmd != null) {
       badgeColor = 'bg-[#FFB37C]';
       badgeLabel = 'Dalam Pengantaran';
      } else if (item.sts_kirim?.toString() === '0' && item.kurirdmd == null) {
       badgeColor = 'bg-gray-400';
       badgeLabel = 'Belum Pickup';
      }
      const isOpen = false;
      return (
       <div
        key={item.id}
        className={`bg-[#232323] rounded-2xl p-4 flex flex-col gap-2 shadow relative mb-4 transition border-2 ${
         isOpen ? 'border-yellow-400' : 'border-transparent'
        } cursor-pointer`}>
        <span className='absolute right-4 top-4 z-10'>
         <span
          className={`inline-flex items-center gap-1 ${badgeColor} text-white text-xs font-bold rounded-full px-3 py-1 shadow`}>
          <span className='w-4 h-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
           {badgeLabel === 'Selesai' ? (
            <svg
             width='16'
             height='16'
             viewBox='0 0 20 20'
             fill='none'>
             <circle
              cx='10'
              cy='10'
              r='10'
              fill='#22C55E'
             />
             <path
              d='M6 10.5L9 13.5L14 8.5'
              stroke='#fff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
             />
            </svg>
           ) : (
            <svg
             width='14'
             height='14'
             viewBox='0 0 24 24'
             fill='none'>
             <circle
              cx='12'
              cy='12'
              r='12'
              fill={
               badgeColor === 'bg-[#FFB37C]'
                ? '#FFB37C'
                : badgeColor === 'bg-green-500'
                ? '#22C55E'
                : '#A3A3A3'
              }
             />
             <path
              d='M12 7v5'
              stroke='#fff'
              strokeWidth='2'
              strokeLinecap='round'
             />
             <circle
              cx='12'
              cy='16'
              r='1'
              fill='#fff'
             />
            </svg>
           )}
          </span>
          {badgeLabel}
         </span>
        </span>
        <span className='inline-block text-white text-xs font-bold rounded-full px-3 py-1 mb-1 w-fit'>
         # {item.id}
        </span>
        <div className='text-white font-bold text-lg tracking-wide'>
         {item.name || item.penerima || '-'}
        </div>
        <div className='text-gray-300 text-sm'>
         {item.address || item.alamat || ''}
        </div>
       </div>
      );
     })}
    </div>
   </div>
   <div className='fixed z-50 w-full max-w-[475px] left-1/2 -translate-x-1/2 bottom-4 mt-2'>
    <BottomNavPage />
   </div>
   {showCamera && <ScanQrcode onClose={() => setShowCamera(false)} />}
   {showDetail && selectedBox && (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'>
     <DetailPengiriman
      paketId={`#${selectedBox.id}`}
      alamat={selectedBox.address || selectedBox.alamat || '-'}
      penerima={selectedBox.name || selectedBox.penerima || '-'}
      telepon='082271153305'
      paket='1 Box - Lunch Weighloss'
      onClose={() => setShowDetail(false)}
     />
    </div>
   )}
  </div>
 );
}

export default function PickupDetailPage() {
 return (
  <Suspense fallback={<LoadingState />}>
   <PickupDetailContent />
  </Suspense>
 );
}
