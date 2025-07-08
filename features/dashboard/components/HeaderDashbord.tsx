import QrCodePage from '@/components/scan/ScanQrcode';
import QrCodeError from '@/components/allert/QrCodeError';
import AlreadyExits from '@/components/allert/AlreadyExits';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { scanBarcode } from '@/lib/yellowfit-courier/api/dashboard';

export default function HeaderDashboardPage() {
 const [showScan, setShowScan] = useState(false);
 const [showError, setShowError] = useState(false);
 const [showAlreadyPickup, setShowAlreadyPickup] = useState(false);
 const [barcode, setBarcode] = useState('');
 const [user, setUser] = useState<{ name: string; email: string } | null>(null);

 useEffect(() => {
  if (typeof window !== 'undefined') {
   const userData = localStorage.getItem('user');
   if (userData) {
    const parsed = JSON.parse(userData);
    setUser({ name: parsed.name, email: parsed.email });
   }
  }
 }, []);

 const handleBarcodeSubmit = async (inputBarcode: string) => {
  try {
   const result = await scanBarcode(inputBarcode);
   console.log('Scan result:', result);

   if (
    result.code === 401 &&
    result.status === 'error' &&
    result.message.includes('Box sudah di Pickup')
   ) {
    setShowAlreadyPickup(true);
    setShowError(false);
   } else if (result.code === 200) {
    // Handle successful scan
    setShowError(false);
    setShowAlreadyPickup(false);
   } else {
    setShowError(true);
    setShowAlreadyPickup(false);
   }
  } catch (error) {
   console.error('Scan error:', error);
   setShowError(true);
   setShowAlreadyPickup(false);
  }
 };

 const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && barcode.trim()) {
   handleBarcodeSubmit(barcode.trim());
  }
 };

 const resetAlerts = () => {
  setShowError(false);
  setShowAlreadyPickup(false);
  setBarcode('');
  setShowScan(false);
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
    <AlreadyExits onCancel={resetAlerts} />
   </div>
  );
 }

 if (showScan) {
  return (
   <div className='fixed inset-0 z-[9999] w-full h-full flex items-center justify-center bg-black bg-opacity-80'>
    <div className='w-full max-w-[475px] mx-auto'>
     <QrCodePage
      onClose={() => setShowScan(false)}
      onScan={(result) => {
       handleBarcodeSubmit(result);
       setShowScan(false);
      }}
     />
    </div>
   </div>
  );
 }

 return (
  <div className='bg-[#FFD823] w-full max-w-[475px] mx-auto pt-4 pb-4 px-4 z-10 relative'>
   <div className='flex items-center mb-3'>
    <Image
     src='/assets/yfk/image/logo-item.png'
     alt='Logo'
     width={170}
     height={170}
     className='mr-2'
    />
   </div>
   <div className='text-black font-bold text-base mb-1'>
    {user ? user.name : 'Nama User'}
   </div>
   <div className='text-black text-xs mb-3'>
    {user ? user.email : 'Email User'}
   </div>
   <div className='flex items-center bg-white rounded-lg px-3 py-2 mb-1'>
    <input
     type='text'
     placeholder='Barcode / Nama Customer'
     className='flex-1 bg-transparent outline-none text-black text-sm'
     value={barcode}
     onChange={(e) => setBarcode(e.target.value)}
     onKeyPress={handleInputKeyPress}
    />
    <button
     className='ml-2'
     onClick={() => setShowScan(true)}>
     <Image
      src='/assets/yfk/icon/qr_code_scanner.png'
      alt='QR Code Scanner'
      width={28}
      height={28}
      className='w-7 h-7'
     />
    </button>
   </div>
  </div>
 );
}
