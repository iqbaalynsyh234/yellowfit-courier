export interface PickupDetailRequest {
 generate_code: string;
 tanggal: string;
}

export interface PickupBox {
 id: number;
 barcode: number;
 kodeproduksi: string;
 address?: string;
 alamat?: string;
 name?: string;
 penerima?: string;
 sts_kirim?: string;
 kurirdmd: any;
 request?: string;
 custom_request?: string;
 datacustomer?: {
  fname: string;
  lname: string;
 };
 datakurirdmd?: {
  name: string;
 };
}

export interface PickupDetailResponse {
 code: number;
 status: string;
 pickup: number;
 ijinkan_berangkat: string;
 is_permission: number;
 data: {
  current_page: number;
  data: PickupBox[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
 };
}
