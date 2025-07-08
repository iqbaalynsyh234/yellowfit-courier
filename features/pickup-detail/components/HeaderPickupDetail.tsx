import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AlreadyExits from '@/components/allert/AlreadyExits';
import QrCodeError from '@/components/allert/QrCodeError';

interface HeaderPickupDetailProps {
 onScanClick?: () => void;
 generateCode?: string;
 onBarcodeSubmit?: (barcode: string) => void;
}

const HeaderPickupDetail: React.FC<HeaderPickupDetailProps> = ({
 onScanClick,
 generateCode,
 onBarcodeSubmit,
}) => {
 const router = useRouter();
 const [barcode, setBarcode] = useState<string>('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [showAlreadyPickup, setShowAlreadyPickup] = useState(false);
 const [showInvalidBarcode, setShowInvalidBarcode] = useState(false);
 const [courierInfo, setCourierInfo] = useState<{
  name: string;
  phone: string;
 } | null>(null);

 const resetAlerts = () => {
  setShowAlreadyPickup(false);
  setShowInvalidBarcode(false);
  setError(null);
 };

 const handleBarcodeSubmit = async () => {
  if (!barcode.trim()) {
   setError('Barcode tidak boleh kosong');
   return;
  }

  setLoading(true);
  resetAlerts();

  try {
   const token = localStorage.getItem('token');
   if (!token) throw new Error('Token tidak ditemukan');

   const response = await fetch(
    `/api/scan-barcode?barcode=${encodeURIComponent(barcode.trim())}`,
    {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
     },
    }
   );

   const data = await response.json();

   if (response.status === 401) {
    // Box already picked up
    if (data.data?.datakurirdmd) {
     setCourierInfo({
      name: data.data.datakurirdmd.name || 'Unknown',
      phone: data.data.datakurirdmd.phone || '-',
     });
     setShowAlreadyPickup(true);
    } else {
     setShowInvalidBarcode(true);
    }
    return;
   }

   if (!response.ok || !data.data) {
    setShowInvalidBarcode(true);
    return;
   }

   // If we have a successful scan and onBarcodeSubmit is provided
   if (onBarcodeSubmit) {
    onBarcodeSubmit(barcode);
    setBarcode(''); // Clear input after submission
   }

   // Handle WhatsApp message if available
   if (data.data?.phone && data.data?.message) {
    const whatsappUrl = `https://wa.me/${
     data.data.phone
    }?text=${encodeURIComponent(data.data.message)}`;
    window.open(whatsappUrl, '_blank');
   }
  } catch (error) {
   console.error('Error submitting barcode:', error);
   setShowInvalidBarcode(true);
  } finally {
   setLoading(false);
  }
 };

 // Handle Enter key press
 const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
   handleBarcodeSubmit();
  }
 };

 if (showAlreadyPickup) {
  return (
   <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'>
    <AlreadyExits
     onCancel={() => {
      resetAlerts();
      setBarcode('');
     }}
     courierInfo={courierInfo || undefined}
    />
   </div>
  );
 }

 if (showInvalidBarcode) {
  return (
   <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'>
    <QrCodeError
     onScanAgain={() => {
      resetAlerts();
      setBarcode('');
     }}
    />
   </div>
  );
 }

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
     placeholder='Masukkan barcode'
     value={barcode}
     onChange={(e) => setBarcode(e.target.value)}
     onKeyPress={handleKeyPress}
     disabled={loading}
    />
    <button
     className='bg-white rounded-full p-2 h-12 w-12 flex items-center justify-center border border-gray-300'
     onClick={handleBarcodeSubmit}
     disabled={loading}>
     {loading ? (
      <div className='w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin' />
     ) : (
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
     )}
    </button>
    <button
     className='bg-white rounded-full p-2 h-12 w-12 flex items-center justify-center border border-gray-300'
     onClick={onScanClick}
     disabled={loading}
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
   {error && (
    <div className='text-red-500 text-sm mt-2 text-center bg-white px-3 py-2 rounded-lg'>
     {error}
    </div>
   )}
  </div>
 );
};

export default HeaderPickupDetail;
