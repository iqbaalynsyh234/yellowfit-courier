'use client';

import BottomNavPage from '@/components/bottom-nav';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AllertPage from '@/components/Allert';
import CameraModalPages from '@/components/CameraModal';
import DetailPengiriman from '@/components/DetailPengiriman';
import HeaderDashboardPage from '../../../../../features/dashboard/components/HeaderDashbord';
import HeaderSummaryDashboard from '../../../../../features/dashboard/components/HeaderSummaryDashboard';
import { useOrderSummary } from '@/hooks/useOrderSummary';
import {
 getOrderStatus,
 OrderDetailItem,
 setDeliveryData,
} from '@/lib/yellowfit-courier/api/dashboard';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import type { Daum } from '@/interfaces/Dashboard';

export default function DashboardPage() {
 const [orderDetails, setOrderDetails] = useState<OrderDetailItem[]>([]);
 const [orderLoading, setOrderLoading] = useState(false);
 const [orderError, setOrderError] = useState<string | null>(null);
 const [showModal, setShowModal] = useState(false);
 const [detailData, setDetailData] = useState<{
  paketId: string;
  alamat: string;
  penerima: string;
  telepon: string;
  paket: string;
 } | null>(null);
 const [realDetail, setRealDetail] = useState<Daum | null>(null);
 const [loadingDetail, setLoadingDetail] = useState(false);
 const [detailError, setDetailError] = useState<string | null>(null);
 const [selectedOrderForPhoto, setSelectedOrderForPhoto] =
  useState<OrderDetailItem | null>(null);
 const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id });
 const {
  data: orderSummary,
  loading: summaryLoading,
  error: summaryError,
 } = useOrderSummary();
 const [expandedOrderIds, setExpandedOrderIds] = useState<number[]>([]);
 const [berangkatLoading, setBerangkatLoading] = useState(false);
 const [berangkatError, setBerangkatError] = useState<string | null>(null);

 useEffect(() => {
  const fetchOrderDetails = async () => {
   setOrderLoading(true);
   setOrderError(null);
   try {
    const today = format(new Date(), 'yyyy-MM-dd');
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/dashboard?tanggal=${today}`, {
     method: 'GET',
     headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
     },
    });
    const data = await response.json();
    if (!response.ok) {
     throw new Error(data.error || 'Failed to fetch order detail');
    }
    setOrderDetails(data.data.data);
   } catch (error: unknown) {
    setOrderError((error as Error)?.message || 'Unknown error');
   } finally {
    setOrderLoading(false);
   }
  };

  fetchOrderDetails();
 }, []);

 if (summaryLoading || orderLoading) {
  return (
   <div className='min-h-screen w-full bg-black relative pb-20 overflow-hidden flex items-center justify-center'>
    <div className='text-white text-lg'>Please Wait...</div>
   </div>
  );
 }

 if (summaryError || orderError) {
  return (
   <div className='min-h-screen w-full bg-black relative pb-20 overflow-hidden flex items-center justify-center'>
    <div className='text-red-500 text-lg text-center px-4'>
     Error loading dashboard: {summaryError || orderError}
    </div>
   </div>
  );
 }

 const handleBerangkat = async (orderDetail: OrderDetailItem) => {
  setBerangkatLoading(true);
  setBerangkatError(null);
  try {
   const token = localStorage.getItem('token');
   if (!token) throw new Error('No authentication token found');

   const today = format(new Date(), 'yyyy-MM-dd');
   const response = await fetch(
    `/api/berangkat?generate_code=${encodeURIComponent(
     orderDetail.generate_code
    )}&tanggal=${encodeURIComponent(today)}`,
    {
     method: 'GET',
     headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
     },
    }
   );

   const data = await response.json();
   if (!response.ok) {
    throw new Error(
     data.error || data.message || 'Failed to process berangkat'
    );
   }

   setShowModal(true);
   //  setTimeout(() => {
   //   window.location.reload();
   //  }, 2000);
  } catch (error) {
   console.error('Berangkat error:', error);
   setBerangkatError((error as Error).message || 'Failed to process berangkat');
  } finally {
   setBerangkatLoading(false);
  }
 };

 const toggleShowActions = (id: number) => {
  setExpandedOrderIds((prev) =>
   prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
  );
 };

 const filteredOrderDetails = orderDetails.filter(
  (orderDetail) => orderDetail.sts_kirim === '0' && orderDetail.kurirdmd != null
 );

 return realDetail ? (
  <div className='relative min-h-screen w-full'>
   <div className='relative z-10 flex flex-col items-center min-h-screen justify-between'>
    <DetailPengiriman
     paketId={`#${realDetail.barcode}`}
     alamat={realDetail.address}
     penerima={
      realDetail.datacustomer
       ? `${realDetail.datacustomer.fname} ${realDetail.datacustomer.lname}`
       : realDetail.penerima || '-'
     }
     telepon={realDetail.datacustomer?.phone || '-'}
     paket={realDetail.request || '-'}
     datacustomer={
      realDetail.datacustomer
       ? {
          ...realDetail.datacustomer,
          phone_clr: realDetail.datacustomer.phone_clr || '',
         }
       : undefined
     }
     onClose={() => setRealDetail(null)}
    />
    <div className='flex-1' />
   </div>
  </div>
 ) : detailData ? (
  <div className='relative min-h-screen w-full'>
   <div className='relative z-10 flex flex-col items-center min-h-screen justify-between'>
    <DetailPengiriman
     paketId={detailData.paketId}
     alamat={detailData.alamat}
     penerima={detailData.penerima}
     telepon={detailData.telepon}
     paket={detailData.paket}
     onClose={() => setDetailData(null)}
    />
    <div className='flex-1' />
   </div>
  </div>
 ) : (
  <div className='min-h-screen w-full bg-black relative pb-20 overflow-hidden'>
   <div
    className='absolute'
    style={{
     width: 470,
     height: 812,
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     opacity: 0.8,
     zIndex: 0,
    }}>
    <Image
     src='/assets/yfk/image/bg-img.png'
     alt='Background'
     width={475}
     height={912}
     style={{ objectFit: 'cover', width: '100%', height: '100%' }}
     priority
    />
    <div
     style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      zIndex: 1,
     }}
    />
   </div>
   <HeaderDashboardPage />
   <div className='w-full max-w-[470px] flex-1 px-4 pt-4 relative z-10 mx-auto flex flex-col'>
    <>
     <div className='text-white font-bold text-lg mb-2 mt-2'>{currentDate}</div>
     <HeaderSummaryDashboard
      tugas={orderSummary?.task?.toString() || '0'}
      pickup={orderSummary?.pickup?.toString() || '0'}
      selesai={orderSummary?.delivered?.toString() || '0'}
     />
     {filteredOrderDetails.length === 0 ? (
      <div className='text-gray-400 text-center mt-8'>
       Tidak ada data pengantaran hari ini ...
      </div>
     ) : (
      filteredOrderDetails.map((orderDetail) => {
       const statusInfo = getOrderStatus(
        orderDetail.sts_kirim,
        orderDetail.kurirdmd ? String(orderDetail.kurirdmd) : null
       );
       const customer = orderDetail.datacustomer;
       const customerName = customer
        ? `${customer.fname} ${customer.lname}`
        : orderDetail.penerima || '-';
       const deliveryAddress = orderDetail.address || '-';
       const customerPhone = customer?.phone || '';
       const isExpanded = expandedOrderIds.includes(orderDetail.id);
       return (
        <div
         key={orderDetail.id}
         className='bg-gray-800 rounded-xl p-4 mb-3 shadow'>
         <div className='flex items-center justify-between mb-1'>
          <div className='flex flex-col'>
           <span className='text-xs text-gray-400 font-mono'>
            #{orderDetail.barcode}
           </span>
           <span className='text-[10px] text-gray-500 mt-0.5'>
            {orderDetail.kodeproduksi}
           </span>
          </div>
          <span
           className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${statusInfo.bgColor} ${statusInfo.textColor}`}>
           {statusInfo.status}
          </span>
          <button
           className='ml-2'
           onClick={() => toggleShowActions(orderDetail.id)}
           aria-label={isExpanded ? 'Sembunyikan aksi' : 'Tampilkan aksi'}>
           {isExpanded ? (
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
         <div className='font-bold text-white text-sm mb-1'>{customerName}</div>
         <div className='text-xs text-gray-300 mb-1'>{deliveryAddress}</div>
         {orderDetail.request && orderDetail.request !== '-' && (
          <div className='text-xs text-yellow-400 mb-2'>
           Request: {orderDetail.request}
          </div>
         )}
         {orderDetail.datakurirdmd && (
          <div className='text-xs text-gray-400 mb-2'>
           Kurir: {orderDetail.datakurirdmd.name}
          </div>
         )}
         {isExpanded && (
          <>
           <div className='flex gap-2 mt-3'>
            <a
             href={`https://wa.me/${customerPhone}`}
             target='_blank'
             rel='noopener noreferrer'
             className='flex-1 bg-green-500 text-white font-semibold py-2 rounded-xl text-sm text-center flex items-center justify-center'>
             Hubungi Customer
            </a>
            <button
             className='flex-1 bg-[#FFD823] text-black font-semibold py-2 rounded-xl text-sm'
             onClick={() => setSelectedOrderForPhoto(orderDetail)}>
             Foto Pengantaran
            </button>
           </div>
           {orderDetail.sts_kirim === '0' && (
            <button
             className='w-full bg-[#FFD823] text-black font-bold py-4 rounded-xl text-center text-base shadow-lg mt-4 mb-2'
             onClick={() => handleBerangkat(orderDetail)}
             disabled={berangkatLoading}>
             {berangkatLoading ? 'Processing...' : 'Berangkat Sekarang'}
            </button>
           )}
           {berangkatError && (
            <div className='text-red-500 text-sm text-center mt-2'>
             {berangkatError}
            </div>
           )}
          </>
         )}
        </div>
       );
      })
     )}
    </>
   </div>
   <AllertPage
    show={showModal}
    onClose={() => setShowModal(false)}
    title='Berangkat Berhasil'
    message='Anda telah siap untuk mengantarkan paket ini'
    buttonText='OK'
    onButtonClick={() => {
     window.location.reload();
    }}
   />
   {selectedOrderForPhoto && !detailData && !realDetail && (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
     <div className='relative w-full max-w-[475px]'>
      <CameraModalPages
       order={selectedOrderForPhoto}
       onClose={() => setSelectedOrderForPhoto(null)}
       onSave={async (formData) => {
        try {
         formData.append('sts_kirim', '1'); // Set status to completed
         const data = await setDeliveryData(formData);

         if (data) {
          setSelectedOrderForPhoto(null);
          setLoadingDetail(true);
          setDetailData(null);
          setRealDetail(null);
          setDetailError(null);

          // Refresh order details to get updated status
          const token = localStorage.getItem('token');
          const today = format(new Date(), 'yyyy-MM-dd');
          const orderResponse = await fetch(`/api/dashboard?tanggal=${today}`, {
           method: 'GET',
           headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
           },
          });
          const orderData = await orderResponse.json();
          if (!orderResponse.ok) {
           throw new Error(orderData.error || 'Failed to fetch order detail');
          }
          setOrderDetails(orderData.data.data);

          // Get delivery details
          const barcode = selectedOrderForPhoto.barcode;
          const detailRes = await fetch(
           `/api/history/find-one?barcode=${barcode}`,
           {
            headers: {
             Authorization: `Bearer ${token}`,
             Accept: 'application/json',
            },
           }
          );
          const detailJson = await detailRes.json();
          if (!detailRes.ok)
           throw new Error(detailJson.error || 'Gagal ambil detail pengiriman');
          setRealDetail(detailJson.data || detailJson);
         }
        } catch (err) {
         setDetailError((err as Error).message);
        } finally {
         setLoadingDetail(false);
        }
       }}
      />
      <button
       className='absolute top-3 right-3 bg-gray-200 text-black px-3 py-1 rounded-lg text-xs z-20'
       onClick={() => setSelectedOrderForPhoto(null)}>
       Tutup
      </button>
      {loadingDetail && (
       <div className='absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40'>
        <div className='text-white text-lg'>Loading detail pengiriman...</div>
       </div>
      )}
      {detailError && (
       <div className='absolute bottom-4 left-0 right-0 text-center text-red-500 bg-white bg-opacity-90 rounded p-2 z-40'>
        {detailError}
       </div>
      )}
     </div>
    </div>
   )}
   <BottomNavPage />
  </div>
 );
}
