import Image from "next/image";

export default function BackgroundimagePage() {
    return (
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
   );
}