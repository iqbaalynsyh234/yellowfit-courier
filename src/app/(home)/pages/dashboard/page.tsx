"use client";

import BottomNavPage from "@/components/bottom-nav";
import Image from "next/image";
import { useState, useEffect } from "react";
import AllertPage from "@/components/Allert";
import CameraModalPages from "@/components/CameraModal";
import DetailPengiriman from "@/components/DetailPengiriman";
import HeaderDashboardPage from "../../../../../features/dashboard/components/HeaderDashbord";
import HeaderSummaryDashboard from "../../../../../features/dashboard/components/HeaderSummaryDashboard";
import { useOrderSummary } from "@/hooks/useOrderSummary";
import { getOrderDetailApi, getOrderStatus, OrderDetailItem } from "@/lib/yellowfit-courier/api/dashboard";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function DashboardPage() {
  const [orders, setOrders] = useState([
    { id: 1, berangkat: true, showActions: true },
    { id: 2, berangkat: false, showActions: false },
  ]);
  const [orderDetails, setOrderDetails] = useState<OrderDetailItem[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id });
  const { data: orderSummary, loading: summaryLoading, error: summaryError } = useOrderSummary();
  const [expandedOrderIds, setExpandedOrderIds] = useState<number[]>([]);

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setOrderLoading(true);
      setOrderError(null);
      try {
        const today = format(new Date(), 'yyyy-MM-dd');
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/dashboard?tanggal=${today}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch order detail');
        }
        setOrderDetails(data.data.data);
      } catch (error: any) {
        setOrderError(error.message);
      } finally {
        setOrderLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (summaryLoading || orderLoading) {
    return (
      <div className="min-h-screen w-full bg-black relative pb-20 overflow-hidden flex items-center justify-center">
        <div className="text-white text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  if (summaryError || orderError) {
    return (
      <div className="min-h-screen w-full bg-black relative pb-20 overflow-hidden flex items-center justify-center">
        <div className="text-red-500 text-lg text-center px-4">
          Error loading dashboard: {summaryError || orderError}
        </div>
      </div>
    );
  }

  const handleBerangkat = (id: number) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, berangkat: true } : order)));
    setShowModal(true);
  };

  const toggleShowActions = (id: number) => {
    setExpandedOrderIds(prev =>
      prev.includes(id) ? prev.filter(_id => _id !== id) : [...prev, id]
    );
  };

  return detailData ? (
    <div className="relative min-h-screen w-full">
      <div className="relative z-10 flex flex-col items-center min-h-screen justify-between">
        <DetailPengiriman
          paketId={detailData.paketId}
          alamat={detailData.alamat}
          penerima={detailData.penerima}
          telepon={detailData.telepon}
          paket={detailData.paket}
          onClose={() => setDetailData(null)}
        />
        <div className="flex-1" />
      </div>
    </div>
    ) : (
    <div className="min-h-screen w-full bg-black relative pb-20 overflow-hidden">
      <div
        className="absolute"
        style={{
          width: 470,
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
      <HeaderDashboardPage />
      <div className="w-full max-w-[470px] flex-1 px-4 pt-4 relative z-10 mx-auto flex flex-col">
        <>
          <div className="text-white font-bold text-lg mb-2 mt-2">{currentDate}</div>
          <HeaderSummaryDashboard 
            tugas={orderSummary?.task?.toString() || "0"}
            pickup={orderSummary?.pickup?.toString() || "0"}
            selesai={orderSummary?.delivered?.toString() || "0"}
          />
          
          {/* Render order details from API */}
          {orderDetails.map((orderDetail, idx) => {
            const statusInfo = getOrderStatus(
              orderDetail.sts_kirim,
              orderDetail.kurirdmd != null ? String(orderDetail.kurirdmd) : null
            );
            const order = orders.find(o => o.id === idx + 1) || { id: idx + 1, berangkat: false, showActions: false };
            const customer = orderDetail.datacustomer;
            const customerName = customer ? `${customer.fname} ${customer.lname}` : '-';
            const customerAddress = customer ? customer.address : '-';
            const customerPhone = customer ? customer.phone : '';
            const isExpanded = expandedOrderIds.includes(orderDetail.id);
            
            return (
              <div key={orderDetail.id} className="bg-gray-800 rounded-xl p-4 mb-3 shadow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400 font-mono">#{orderDetail.barcode}</span>
                  <span className={`${statusInfo.bgColor} ${statusInfo.textColor} text-xs font-semibold px-3 py-1 rounded-full`}>
                    {statusInfo.status}
                  </span>
                  <button 
                    className="ml-2" 
                    onClick={() => toggleShowActions(orderDetail.id)} 
                    aria-label={isExpanded ? "Sembunyikan aksi" : "Tampilkan aksi"}
                  >
                    {isExpanded ? (
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M6 15l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="font-bold text-white text-sm mb-1">{customerName}</div>
                <div className="text-xs text-gray-300 mb-1">{customerAddress}</div>
                {isExpanded && (
                  <>
                    <div className="flex gap-2 mt-3">
                      <a
                        href={`https://wa.me/${customerPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-xl text-sm text-center flex items-center justify-center"
                      >
                        Hubungi Customer
                      </a>
                      <button className="flex-1 bg-[#FFD823] text-black font-semibold py-2 rounded-xl text-sm" onClick={() => setShowCameraModal(true)}>
                        Foto Pengantaran
                      </button>
                    </div>
                    <button className="w-full bg-[#FFD823] text-black font-bold py-4 rounded-xl text-center text-base shadow-lg mt-4 mb-2" onClick={() => handleBerangkat(order.id)}>
                      Berangkat Sekarang 
                    </button>
                  </>
                )}
              </div>
            );
          })}

          {/* Fallback to static orders if no API data */}
          {orderDetails.length === 0 && orders.map((order, idx) => (
            <div key={order.id} className="bg-gray-800 rounded-xl p-4 mb-3 shadow">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400 font-mono">#1668091</span>
                <span className="bg-orange-200 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">Dalam Pengantaran</span>
                <button className="ml-2" onClick={() => toggleShowActions(order.id)} aria-label={order.showActions ? "Sembunyikan aksi" : "Tampilkan aksi"}>
                  {order.showActions ? (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M6 15l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="font-bold text-white text-sm mb-1">Angelica Theresia</div>
              <div className="text-xs text-gray-300 mb-1">Pademangan timur 4 gang 32 komplek duta kemayoran blok</div>
              {order.showActions && (
                <>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-xl text-sm">Hubungi Customer</button>
                    <button className="flex-1 bg-[#FFD823] text-black font-semibold py-2 rounded-xl text-sm" onClick={() => setShowCameraModal(true)}>
                      Foto Pengantaran
                    </button>
                  </div>
                  {!order.berangkat && idx === 0 && (
                    <button className="w-full bg-[#FFD823] text-black font-bold py-4 rounded-xl text-center text-base shadow-lg mt-4 mb-2" onClick={() => handleBerangkat(order.id)}>
                      Berangkat Sekarang 
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </>
      </div>
      <AllertPage show={showModal} onClose={() => setShowModal(false)} />
      {showCameraModal && !detailData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-[375px]">
            <CameraModalPages 
              onClose={() => setShowCameraModal(false)}
              onSave={(data) => {
                setDetailData(data);
                setShowCameraModal(false);
              }}
            />
            <button 
              className="absolute top-3 right-3 bg-gray-200 text-black px-3 py-1 rounded-lg text-xs z-20" 
              onClick={() => setShowCameraModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      <BottomNavPage />
    </div>
  );
}
