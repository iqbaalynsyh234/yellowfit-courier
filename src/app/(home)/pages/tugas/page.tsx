'use client';

import BottomNavPage from '@/components/bottom-nav';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import HeaderDashboardPage from '../../../../../features/dashboard/components/HeaderDashbord';
import { getTugasList } from '@/lib/yellowfit-courier/api/tugas/Tugas';
import { TugasResponse, TugasApiResponse } from '@/interfaces/Tugas';
import Pagination from '@/components/Pagination';

export default function TugasCourierPage() {
 const [tugasList, setTugasList] = useState<TugasResponse[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [currentDate, setCurrentDate] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [apiResponse, setApiResponse] = useState<TugasApiResponse | null>(null);

 useEffect(() => {
  const fetchTugas = async () => {
   try {
    setLoading(true);
    const response = await getTugasList(currentPage);
    setApiResponse(response);
    setTugasList(response.data.data);
    setTotalPages(response.data.last_page);
   } catch (err) {
    console.error('Error in fetchTugas:', err);
    setError('Failed to fetch tasks');
   } finally {
    setLoading(false);
   }
  };

  fetchTugas();
 }, [currentPage]);

 const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages) {
   setCurrentPage(newPage);
  }
 };

 const HanddleToCopyClipboard = (barcode: string) => {
  navigator.clipboard.writeText(barcode);
 };

 useEffect(() => {
  const today = new Date();
  setCurrentDate(
   today.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
   })
  );
 }, []);

 const getSesiLabel = (sesi: 'L' | 'D') => {
  return sesi === 'L' ? 'Lunch' : 'Dinner';
 };

 return (
  <main className='min-h-screen w-full bg-black relative pb-20 overflow-hidden'>
   <div className='fixed inset-0 w-[475px] mx-auto'>
    <Image
     src='/assets/yfk/image/bg-img.png'
     alt='Background'
     width={475}
     height={812}
     className='object-cover w-full h-full'
     priority
    />
    <div className='absolute inset-0 bg-black/60' />
   </div>

   {/* Content */}
   <div className='relative z-10'>
    <div className='bg-[#FFD823] w-full max-w-[475px] mx-auto px-4 pt-4 pb-4'>
     <HeaderDashboardPage />
    </div>

    <div className='w-full max-w-[475px] flex-1 px-4 pt-4 mx-auto'>
     <div className='text-white font-bold text-lg mb-2 mt-2'>{currentDate}</div>
     {loading ? (
      <div className='flex items-center justify-center min-h-[200px]'>
       <div className='text-white text-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4'></div>
        Loading Data...
       </div>
      </div>
     ) : error ? (
      <div className='text-red-500 text-center mt-8'>{error}</div>
     ) : !Array.isArray(tugasList) ? (
      <div className='text-red-500 text-center mt-8'>
       Invalid data format received
      </div>
     ) : tugasList.length === 0 ? (
      <div className='text-gray-400 text-center mt-8'>
       Tidak ada tugas hari ini.
      </div>
     ) : (
      <>
       {tugasList.map((item) => (
        <div
         key={item.id}
         className='bg-gray-800 rounded-xl p-4 mb-3 shadow'>
         <div className='flex items-center justify-between mb-1'>
          <span
           className='text-xs text-gray-400 font-mono cursor-pointer hover:text-gray-300'
           onClick={() => HanddleToCopyClipboard(item.barcode.toString())}>
           {item.barcode}
          </span>
          <span
           className={`text-xs font-semibold px-3 py-1 rounded-full ${
            item.sesi === 'L'
             ? 'bg-[#FFD823] text-black'
             : 'bg-orange-500 text-white'
           }`}>
           {getSesiLabel(item.sesi)}
          </span>
         </div>
         <div className='font-bold text-white text-sm mb-1'>
          {item.datacustomer.fname} {item.datacustomer.lname}
         </div>
         <div className='text-xs text-gray-300 mb-1'>{item.address}</div>
        </div>
       ))}
       {apiResponse && (
        <Pagination
         currentPage={currentPage}
         totalPages={totalPages}
         onPageChange={handlePageChange}
        />
       )}
      </>
     )}
    </div>
   </div>
   <div className=' max-w-[485px] fixed bottom-0 left-0 right-0 z-50'>
    <BottomNavPage />
   </div>
  </main>
 );
}
