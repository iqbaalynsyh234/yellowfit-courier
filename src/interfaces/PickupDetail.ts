export interface PickupDetailRequest {
 generate_code: string;
 tanggal: string;
}

export interface PickupBox {
 id: number | string;
 name?: string;
 penerima?: string;
 address?: string;
 alamat?: string;
 status?: string;
 sts_kirim?: string;
 kurirdmd?: string | number | null;
 // tambahkan field lain sesuai kebutuhan
}

export interface PickupDetailResponse {
 code: number;
 status: string;
 pickup: number;
 ijinkan_berangkat: string;
 is_permission: number;
 data: {
  data: PickupBox[];
  // field lain jika ada
 };
}
