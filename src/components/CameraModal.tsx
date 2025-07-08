import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import type { CameraModalPagesProps } from '@/interfaces/FotoPengiriman';
import ErrorLocation from './allert/ErrorLocation';
import { format } from 'date-fns';

export default function CameraModalPages({
 order,
 onClose,
 onSave,
}: CameraModalPagesProps) {
 const [selectedImage, setSelectedImage] = useState<string | null>(null);
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);
 const [copied, setCopied] = useState(false);
 const [penerima, setPenerima] = useState('');
 const [catatan, setCatatan] = useState('');
 const [showLocationError, setShowLocationError] = useState(false);
 const [location, setLocation] = useState<{
  latitude: number;
  longitude: number;
 } | null>(null);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  checkLocationPermission();
 }, []);

 const checkLocationPermission = () => {
  if (!navigator.geolocation) {
   setShowLocationError(true);
   return;
  }

  navigator.geolocation.getCurrentPosition(
   (position) => {
    setLocation({
     latitude: position.coords.latitude,
     longitude: position.coords.longitude,
    });
   },
   () => {
    setShowLocationError(true);
   }
  );
 };

 const handleButtonClick = () => {
  if (!location) {
   setShowLocationError(true);
   return;
  }
  fileInputRef.current?.click();
 };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
   setSelectedFile(file);
   const reader = new FileReader();
   reader.onload = (event) => {
    setSelectedImage(event.target?.result as string);
   };
   reader.readAsDataURL(file);
  }
 };

 const handleCopy = () => {
  if (order?.barcode) {
   navigator.clipboard.writeText(order.barcode.toString());
  setCopied(true);
  setTimeout(() => setCopied(false), 1200);
  }
 };

 const handleSave = async () => {
  if (!location || !selectedFile || !penerima) {
   if (!location) setShowLocationError(true);
   return;
  }

  setIsLoading(true);
  try {
   const formData = new FormData();
   formData.append('generate_code', order.generate_code);
   formData.append('barcode', order.barcode.toString());
   formData.append('penerima', penerima);
   formData.append('gambar', selectedFile);
   formData.append('description', catatan || 'sesuai titik');
   formData.append('tanggal', format(new Date(), 'yyyy-MM-dd'));
   formData.append('latitude', location.latitude.toString());
   formData.append('longitude', location.longitude.toString());

   onSave?.(formData);
  } catch (error) {
   console.error('Error preparing data:', error);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className='fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-80'>
   <div className='relative w-full max-w-[485px] h-full max-h-screen mx-auto overflow-y-auto shadow-xl bg-transparent flex flex-col'>
    <div className='bg-[#FFD823] px-4 py-3 flex items-center justify-between sticky top-0 z-20 w-full'>
     <span className='font-bold text-black text-base'>Foto Pengantaran</span>
     <button
      className='bg-white text-black px-3 py-1 rounded-lg text-xs font-semibold shadow'
      style={{ minWidth: 70 }}
      onClick={onClose}>
      Tutup
     </button>
    </div>
    {/* Konten */}
    <div className='p-4 relative z-10 flex-1'>
     {/* Paket ID dan Copy */}
     <div className='flex items-center justify-between mb-2'>
      <span className='text-white text-sm'>Paket ID:</span>
      <span className='font-bold text-white text-sm mr-2'>
       {order ? `#${order.barcode || order.id}` : ''}
      </span>
      <button onClick={handleCopy}>
       <svg
        width='18'
        height='18'
        fill='none'
        viewBox='0 0 24 24'>
        <rect
         x='9'
         y='9'
         width='13'
         height='13'
         rx='2'
         stroke='#FFD823'
         strokeWidth='2'
        />
        <rect
         x='3'
         y='3'
         width='13'
         height='13'
         rx='2'
         stroke='#FFD823'
         strokeWidth='2'
        />
       </svg>
      </button>
      {copied && (
       <span className='ml-2 text-xs text-[#FFD823] font-semibold animate-pulse'>
        Disalin!
       </span>
      )}
     </div>
     {/* Alamat */}
     <div className='mb-2'>
      <span className='text-white text-sm block mb-1'>Alamat</span>
      <span className='text-gray-200 text-xs'>
       {order?.datacustomer?.address || order?.address || '-'}
      </span>
     </div>
     {/* Customer & Paket */}
     <div className='flex justify-between mb-3'>
      <div>
       <span className='text-white text-xs'>Customer</span>
       <div className='text-white text-sm font-semibold'>
        {order?.datacustomer?.fname || '-'}
       </div>
      </div>
      <div className='text-right'>
       <span className='text-white text-xs'>Paket</span>
       <div className='text-white text-sm font-semibold'>
        {order?.tipeitem || order?.tipemenu
         ? `${order?.tipeitem || ''} ${order?.tipemenu || ''}`.trim()
         : '-'}
       </div>
      </div>
     </div>
     {/* Input Penerima Paket */}
     <input
      type='text'
      placeholder='Penerima Paket'
      className='w-full mb-2 px-4 py-3 rounded-lg bg-white text-black placeholder-gray-400 text-sm outline-none'
      value={penerima}
      onChange={(e) => setPenerima(e.target.value)}
     />
     {/* Input Catatan */}
     <input
      type='text'
      placeholder='Catatan (Opsional)'
      className='w-full mb-4 px-4 py-3 rounded-lg bg-white text-black placeholder-gray-400 text-sm outline-none'
      value={catatan}
      onChange={(e) => setCatatan(e.target.value)}
     />
     {/* Preview Foto */}
     {selectedImage && (
      <div className='w-full flex justify-center mb-5'>
       <Image
        src={selectedImage}
        alt='Preview'
        width={200}
        height={200}
        className='w-48 h-48 object-cover rounded-xl border-4 border-[#FFD823] shadow-lg bg-black'
        style={{ maxWidth: 200, maxHeight: 200 }}
       />
      </div>
     )}
     {/* Tombol Tambah Foto */}
     <input
      type='file'
      accept='image/*'
      capture='environment'
      ref={fileInputRef}
      className='hidden'
      onChange={handleFileChange}
     />
     <button
      className='w-full bg-[#FFD823] text-black font-bold py-3 rounded-xl text-base mb-5 shadow-md hover:bg-yellow-400 transition'
      type='button'
      onClick={handleButtonClick}>
      + Tambah Foto
     </button>
     {/* Tombol Hubungi Customer */}
     <button className='w-full border border-green-500 text-green-500 font-semibold py-2 rounded-xl text-base mb-2 hover:bg-green-50 transition'>
      Hubungi Customer
     </button>
     <button
      className='w-full bg-[#FFD823] text-black font-bold py-2 rounded-xl text-base shadow-md hover:bg-yellow-400 transition mt-0'
      onClick={handleSave}
      disabled={isLoading || !location || !selectedFile || !penerima}>
      {isLoading ? 'Menyimpan...' : 'Simpan'}
     </button>
    </div>
    <div className='absolute inset-0 w-full h-full -z-10'>
     <Image
      src='/assets/yfk/image/bg-img.png'
      alt='Background'
      fill
      style={{ objectFit: 'cover' }}
      priority
     />
    </div>
   </div>
   <ErrorLocation
    show={showLocationError}
    onClose={() => {
     setShowLocationError(false);
     checkLocationPermission();
    }}
   />
  </div>
 );
}
