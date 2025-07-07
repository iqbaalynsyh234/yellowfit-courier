'use client';

import BottomNavPage from '@/components/bottom-nav';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import HeaderDashboardPage from '../../../../../features/dashboard/components/HeaderDashbord';
import { getTugasList } from '@/lib/yellowfit-courier/api/tugas/Tugas';
import { TugasResponse } from '@/interfaces/Tugas';

export default function TugasCourierPage() {
  const [tugasList, setTugasList] = useState<TugasResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchTugas = async () => {
      try {
        setLoading(true);
        const data = await getTugasList();
        setTugasList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error in fetchTugas:', err);
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTugas();
  }, []);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString('id-ID', {
        weekday: 'long', day: '2-digit', month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  const getSesiLabel = (sesi: 'L' | 'D') => {
    return sesi === 'L' ? 'Lunch' : 'Dinner';
  };

  return (
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
      <div className='w-full max-w-[475px] flex-1 px-4 pt-4 relative z-10 mx-auto flex flex-col'>
        <HeaderDashboardPage />
        <div className='text-white font-bold text-lg mb-2 mt-2'>{currentDate}</div>
        {loading ? (
          <div className='text-gray-400 text-center mt-8'>Loading...</div>
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
          tugasList.map((item) => (
            <div
              key={item.id}
              className='bg-gray-800 rounded-xl p-4 mb-3 shadow'>
              <div className='flex items-center justify-between mb-1'>
                <span className='text-xs text-gray-400 font-mono'>
                  #{item.generate_code}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${item.sesi === 'L'
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
          ))
        )}
      </div>
      <BottomNavPage />
    </div>
  );
}
