interface ErrorLocationProps {
 show: boolean;
 onClose: () => void;
}

export default function ErrorLocation({ show, onClose }: ErrorLocationProps) {
 if (!show) return null;

 return (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
   <div className='bg-white rounded-2xl p-6 w-[90%] max-w-xs flex flex-col items-center shadow-xl'>
    <div className='bg-red-500 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
     <svg
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'>
      <path
       d='M12 15V9m0 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
       stroke='#fff'
       strokeWidth='2'
       strokeLinecap='round'
      />
     </svg>
    </div>
    <div className='font-bold text-lg text-center mb-1'>Error Lokasi</div>
    <div className='text-gray-700 text-center mb-4 text-sm'>
     Mohon aktifkan lokasi untuk melanjutkan
    </div>
    <button
     className='w-full bg-red-500 text-white font-semibold py-2 rounded-xl text-sm'
     onClick={onClose}>
     OK
    </button>
   </div>
  </div>
 );
}
