import Image from "next/image";

export default function HeaderHistoryPage() {
  return (
    <div
      className="absolute"
      style={{
        width: 395,
        height: 812,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0.8,
        zIndex: 0,
      }}
     >
      <Image src="/assets/yfk/image/bg-img.png" alt="Background" width={475} height={912} style={{ objectFit: "cover", width: "100%", height: "100%" }} priority />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />
    </div>
  );
}
