import Image from "next/image";

export default function HeaderPage() {
  return (
   <>
           <div
             className="absolute mb-4 flex items-center rounded-lg px-3 py-2 mt-6 ml-6 w-fit shadow z-20"
             style={{ left: 0, top: 0 }}
           >
             <Image
               src="/assets/yfk/image/logo.png"
               alt="Logo"
               width={32}
               height={32}
               className="mr-2"
             />
             <span className="text-white font-bold text-xl tracking-wide">Yellow Fit Kitchen</span>
           </div>
   </>
  );
}