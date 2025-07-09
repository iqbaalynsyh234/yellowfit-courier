'use client';

import BottomNavPage from '@/components/bottom-nav';
import { useState, useEffect } from 'react';
import DetailPengiriman from '@/components/DetailPengiriman';
import ScanBarcodePage from '../../../../../features/history/components/ScanBarcodePage';
import {
 getOrderHistoryApi,
 getOrderHistoryDetailApi,
 scanBarcode,
} from '@/lib/yellowfit-courier/api/history/HistoryApi';
import { format } from 'date-fns';
import Image from 'next/image';
import { HistoryItem, DetailData } from '@/interfaces/History';
import QrCodeError from '@/components/allert/QrCodeError';
import AlreadyExits from '@/components/allert/AlreadyExits';
import SuccesQrcode from '@/components/scan/SuccesQrcode';
import Pagination from '@/components/Pagination';

const getDeliveryStatus = (
 sts_kirim: string,
 datakurirdmd: HistoryItem['datakurirdmd']
) => {
 const stsKirimNum = parseInt(sts_kirim);

 if (stsKirimNum === 1) {
  return {
   label: 'Selesai',
   bgColor: '#D1FAE5',
   textColor: '#065F46',
   iconType: 'success',
  };
 } else if (stsKirimNum === 0 && datakurirdmd) {
  return {
   label: 'Dalam Pengantaran',
   bgColor: '#FEF3C7',
   textColor: '#92400E',
   iconType: 'progress',
  };
 } else {
  return {
   label: 'Belum Pickup',
   bgColor: '#FEE2E2',
   textColor: '#991B1B',
   iconType: 'pending',
  };
 }
};

const StatusIcon = ({ type }: { type: string }) => {
 switch (type) {
  case 'success':
   return (
    <svg
     width='16'
     height='16'
     fill='none'
     viewBox='0 0 24 24'>
     <circle
      cx='12'
      cy='12'
      r='12'
      fill='#3AC0A0'
     />
     <path
      d='M8 12.5l2.5 2.5 5-5'
      stroke='#fff'
      strokeWidth='2'
      strokeLinecap='round'
     />
    </svg>
   );
  case 'progress':
   return (
    <svg
     width='16'
     height='16'
     fill='none'
     viewBox='0 0 24 24'>
     <circle
      cx='12'
      cy='12'
      r='12'
      fill='#F59E0B'
     />
     <path
      d='M12 6v6l4 2'
      stroke='#fff'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
     />
    </svg>
   );
  case 'pending':
   return (
    <svg
     width='16'
     height='16'
     fill='none'
     viewBox='0 0 24 24'>
     <circle
      cx='12'
      cy='12'
      r='12'
      fill='#EF4444'
     />
     <path
      d='M12 8v4M12 16h.01'
      stroke='#fff'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
     />
    </svg>
   );
  default:
   return null;
 }
};

export default function HistoryPage() {
 const [search, setSearch] = useState('');
 const [openIdx, setOpenIdx] = useState<number | null>(null);
 const [detailData, setDetailData] = useState<DetailData | null>(null);
 const [history, setHistory] = useState<HistoryItem[]>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [loadingDetail, setLoadingDetail] = useState(false);
 const [showError, setShowError] = useState(false);
 const [showAlreadyPickup, setShowAlreadyPickup] = useState(false);
 const [showSuccess, setShowSuccess] = useState(false);
 const [pickupMessage, setPickupMessage] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);

 useEffect(() => {
  const fetchHistory = async () => {
   setLoading(true);
   setError(null);
   try {
    const today = format(new Date(), 'yyyy-MM-dd');
    const data = await getOrderHistoryApi(today, currentPage);

    // Filter hanya data dengan sts_kirim = "1" (Selesai)
    const completedOrders = data.data.data.filter(
     (item: HistoryItem) => item.sts_kirim === '1'
    );
    setHistory(completedOrders);
    setTotalPages(data.data.last_page);
   } catch (err: unknown) {
    setError((err as Error)?.message || 'Gagal mengambil data history');
   } finally {
    setLoading(false);
   }
  };
  fetchHistory();
 }, [currentPage]);

 const handlePageChange = (newPage: number) => {
  setCurrentPage(newPage);
  setOpenIdx(null); // Reset expanded item when changing page
 };

 const handleDetail = async (barcode: string | number) => {
  setLoadingDetail(true);
  setError(null);
  try {
   const detail = await getOrderHistoryDetailApi(barcode);
   setDetailData(detail.data);
  } catch (err: unknown) {
   setError((err as Error)?.message || 'Gagal mengambil detail pengiriman');
  } finally {
   setLoadingDetail(false);
  }
 };

 const handleBarcodeSubmit = async (inputBarcode: string) => {
  try {
   const result = await scanBarcode(inputBarcode);
   console.log('result scan :', result);
   if (
    result.code === 401 &&
    result.status === 'error' &&
    result.message.includes('Box sudah di Pickup')
   ) {
    setShowAlreadyPickup(true);
    setPickupMessage(result.message);
    setShowError(false);
    setShowSuccess(false);
   } else if (result.code === 200) {
    setShowSuccess(true);
    setShowError(false);
    setShowAlreadyPickup(false);
   } else {
    setShowError(true);
    setShowAlreadyPickup(false);
    setShowSuccess(false);
   }
  } catch (error) {
   console.error('Scan error:', error);
   setShowError(true);
   setShowAlreadyPickup(false);
   setShowSuccess(false);
  }
 };

 const resetAlerts = () => {
  setShowError(false);
  setShowAlreadyPickup(false);
  setShowSuccess(false);
  setSearch('');
 };

 const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && search.trim()) {
   handleBarcodeSubmit(search.trim());
  }
 };

 if (showError) {
  return (
   <div className='fixed inset-0 z-[9999] w-full h-full flex items-center justify-center bg-black bg-opacity-80'>
    <QrCodeError onScanAgain={resetAlerts} />
   </div>
  );
 }

 if (showAlreadyPickup) {
  return (
   <div className='fixed inset-0 z-[9999] w-full h-full flex items-center justify-center bg-black bg-opacity-80'>
    <AlreadyExits
     onCancel={resetAlerts}
     message={pickupMessage}
    />
   </div>
  );
 }

 if (showSuccess) {
  return (
   <div className='fixed inset-0 z-[9999] w-full h-full flex items-center justify-center bg-black bg-opacity-80'>
    <SuccesQrcode onScanAgain={resetAlerts} />
   </div>
  );
 }

 if (detailData) {
  return (
   <div className='min-h-screen w-full bg-black relative flex flex-col items-center pb-20 overflow-hidden'>
    <DetailPengiriman
     paketId={String(detailData.barcode)}
     alamat={detailData.address}
     penerima={
      detailData.datacustomer
       ? `${detailData.datacustomer.fname} ${detailData.datacustomer.lname}`
       : detailData.penerima
     }
     telepon={detailData.datacustomer ? detailData.datacustomer.phone : ''}
     paket={'-'}
     datacustomer={detailData.datacustomer}
     onClose={() => setDetailData(null)}
    />
    <BottomNavPage />
   </div>
  );
 }

 return (
  <div className='min-h-screen w-full flex flex-col items-center pb-20 overflow-hidden bg-black'>
   <div className='relative w-full max-w-[475px] flex-1 flex flex-col items-center'>
    <div className='absolute inset-0 w-full max-w-[475px]'>
     <Image
      src='/assets/yfk/image/bg-img.png'
      alt='Background'
      fill
      className='object-cover'
      style={{ pointerEvents: 'none' }}
     />
     <div
      className='absolute inset-0'
      style={{
       background: 'rgba(0,0,0,0.6)',
       zIndex: 1,
      }}
     />
    </div>
    <div className='relative z-10 w-full flex flex-col items-center'>
     <ScanBarcodePage
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyPress={handleInputKeyPress}
     />
     <div className='w-full flex-1 px-4 pt-4'>
      {loading ? (
       <div className='text-white text-center mt-8'>Loading...</div>
      ) : error ? (
       <div className='text-red-500 text-center mt-8'>{error}</div>
      ) : history.length === 0 ? (
       <div className='text-gray-400 text-center mt-8'>
        Tidak ada data history yang selesai hari ini.
       </div>
      ) : (
       <>
        {history.map((item, idx) => {
         const isOpen = openIdx === idx;
         const customer = item.datacustomer;
         const status = getDeliveryStatus(item.sts_kirim, item.datakurirdmd);

         return (
          <div
           key={item.id}
           className='bg-[#232323] rounded-2xl p-4 flex flex-col gap-2 shadow relative mb-4'>
           <div className='flex items-center justify-between mb-1'>
            <span className='text-xs text-gray-400 font-mono'>
             # {item.barcode || item.id}
            </span>
            <span
             className='text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ml-auto'
             style={{
              backgroundColor: status.bgColor,
              color: status.textColor,
             }}>
             <StatusIcon type={status.iconType} />
             {status.label}
            </span>
            <button
             className='ml-2'
             onClick={() => setOpenIdx(isOpen ? null : idx)}
             aria-label={isOpen ? 'Sembunyikan detail' : 'Tampilkan detail'}>
             {isOpen ? (
              <svg
               width='20'
               height='20'
               fill='none'
               viewBox='0 0 24 24'>
               <path
                d='M6 15l6-6 6 6'
                stroke='#fff'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
               />
              </svg>
             ) : (
              <svg
               width='20'
               height='20'
               fill='none'
               viewBox='0 0 24 24'>
               <path
                d='M6 9l6 6 6-6'
                stroke='#fff'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
               />
              </svg>
             )}
            </button>
           </div>
           <div className='font-bold text-white text-sm mb-1'>
            {customer ? `${customer.fname} ${customer.lname}` : item.penerima}
           </div>
           <div className='text-xs text-gray-300 mb-1'>{item.address}</div>
           {isOpen && (
            <button
             className='w-full bg-[#FFD823] text-black font-bold py-3 rounded-xl text-center text-base shadow-lg mt-2'
             onClick={() => handleDetail(item.barcode || item.id)}
             disabled={loadingDetail}>
             {loadingDetail ? 'Loading...' : 'Detail Pengiriman'}
            </button>
           )}
          </div>
         );
        })}
        <Pagination
         currentPage={currentPage}
         totalPages={totalPages}
         onPageChange={handlePageChange}
        />
       </>
      )}
     </div>
    </div>
   </div>
   <BottomNavPage />
  </div>
 );
}
