export interface PickupDetailRequest {
  generate_code: string;
  tanggal: string;
}

export interface PickupDetailItem {
  // Tambahkan field sesuai response detail pickup
  id: number;
  // ... tambahkan field lain jika ada
}

export interface PickupDetailResponse {
  code: number;
  status: string;
  pickup: number;
  ijinkan_berangkat: string;
  is_permission: number;
  data: any; // bisa diganti dengan tipe detail jika sudah tahu
}

export async function getPickupDetail(): Promise<any> {
  // ...implementation
}
