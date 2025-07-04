'use client';
import { usePathname, useRouter } from 'next/navigation';
import { MdAssignment } from 'react-icons/md';
import Image from 'next/image';

export default function BottomNavPage() {
 const pathname = usePathname();
 const router = useRouter();

 return (
  <div className='fixed z-50 w-full max-w-[470px] left-1/2 -translate-x-1/2 bottom-2 mb-3'>
   <div className='flex justify-between items-center bg-black bg-opacity-80 border border-gray-700 rounded-full px-4 py-2 shadow-lg'>
    <button
     className={`flex flex-col items-center flex-1 group ${
      pathname === '/pages/dashboard' ? 'text-yellow-400' : 'text-white'
     }`}
     onClick={() => router.push('/pages/dashboard')}>
     <Image
      src='/assets/yfk/icon/home.png'
      alt='Home'
      width={24}
      height={24}
      className='w-6 h-6 mb-1 transition filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-45'
     />
     <span
      className={`text-lg group-hover:text-yellow-400 ${
       pathname === '/pages/dashboard' ? 'text-yellow-400 font-bold' : ''
      }`}>
      Home
     </span>
    </button>

    {/* Pickup */}
    <button
     className={`flex flex-col items-center flex-1 group ${
      pathname === '/pages/pickup' ? 'text-yellow-400' : 'text-white'
     }`}
     onClick={() => router.push('/pages/pickup')}>
     <Image
      src='/assets/yfk/icon/location_searching.png'
      alt='Home'
      width={24}
      height={24}
      className='w-6 h-6 mb-1 transition filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-45'
     />
     <span
      className={`text-lg group-hover:text-yellow-400 ${
       pathname === '/pages/pickup' ? 'text-yellow-400 font-bold' : ''
      }`}>
      Pickup
     </span>
    </button>
    <button
     className={`flex flex-col items-center flex-1 group ${
      pathname === '/pages/tugas' ? 'text-yellow-400' : 'text-white'
     }`}
     onClick={() => router.push('/pages/tugas')}>
     <MdAssignment className='w-6 h-6 mb-1 group-hover:text-yellow-400' />
     <span
      className={`text-lg group-hover:text-yellow-400 ${
       pathname === '/pages/tugas' ? 'text-yellow-400 font-bold' : ''
      }`}>
      Tugas
     </span>
    </button>
    {/* History */}
    <button
     className={`flex flex-col items-center flex-1 group ${
      pathname === '/pages/history' ? 'text-yellow-400' : 'text-white'
     }`}
     onClick={() => router.push('/pages/history')}>
     <Image
      src='/assets/yfk/icon/local_shipping.png'
      alt='Home'
      width={24}
      height={24}
      className='w-6 h-6 mb-1 transition filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-45'
     />
     <span
      className={`text-lg group-hover:text-yellow-400 ${
       pathname === '/pages/history' ? 'text-yellow-400 font-bold' : ''
      }`}>
      History
     </span>
    </button>
    {/* Profil */}
    <button
     className={`flex flex-col items-center flex-1 group ${
      pathname === '/pages/profile' ? 'text-yellow-400' : 'text-white'
     }`}
     onClick={() => router.push('/pages/profile')}>
     <Image
      src='/assets/yfk/icon/person.png'
      alt='Home'
      width={24}
      height={24}
      className='w-6 h-6 mb-1 transition filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-45'
     />
     <span
      className={`text-lg group-hover:text-yellow-400 ${
       pathname === '/pages/profile' ? 'text-yellow-400 font-bold' : ''
      }`}>
      Profil
     </span>
    </button>
   </div>
  </div>
 );
}
