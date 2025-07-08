interface AlreadyExitsProps {
 onCancel?: () => void;
 courierInfo?: {
  name: string;
  phone: string;
 };
 message?: string;
}

export default function AlreadyExits({
 onCancel,
 courierInfo,
 message,
}: AlreadyExitsProps) {
 return (
  <div className='max-w-xs mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center'>
   <div className='w-14 h-14 rounded-full bg-[#FF6B6B] flex items-center justify-center mb-4'>
    <svg
     width='32'
     height='32'
     viewBox='0 0 32 32'
     fill='none'>
     <circle
      cx='16'
      cy='16'
      r='16'
      fill='#FF6B6B'
     />
     <text
      x='16'
      y='22'
      textAnchor='middle'
      fontSize='20'
      fill='#fff'
      fontWeight='bold'>
      !
     </text>
    </svg>
   </div>
   <div className='font-bold text-xl text-black mb-2 text-center'>
    {message || 'Box sudah di Pickup oleh Kurir'}
    <br />
    {courierInfo
     ? `${courierInfo.name} (${courierInfo.phone})`
     : 'Unknown Courier'}
   </div>
   <div className='text-center text-black/80 mb-6 text-base'>
    Silahkan hubungi koordinator
   </div>
   <button
    className='w-full bg-[#FFD823] hover:bg-yellow-400 text-black font-bold rounded-xl py-3 text-base transition'
    onClick={onCancel}>
    Kembali
   </button>
  </div>
 );
}
