import { useRouter } from "next/navigation";

export default function HeaderPickupDetail() {
  const router = useRouter();
  return (
    <div className="bg-[#FFD823] w-full px-4 py-3 flex items-center gap-2">
      <button onClick={() => router.back()} className="mr-2">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#232323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <img src="/assets/yfk/image/logo-item.png" alt="logo" className="h-7 w-auto" />
    </div>
  );
}