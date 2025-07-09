export interface HistoryItem {
 id: number;
 barcode: number;
 address: string;
 penerima: string | null;
 sesi: string;
 kodeproduksi: string;
 generate_code: string;
 sts_kirim: string;
 done_at: string | null;
 pickup_at: string | null;
 datacustomer?: {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  phone_clr: string | null;
  address: string | null;
 };
 datakurirdmd?: {
  id: number;
  name: string;
  phone: string;
 } | null;
 datakurirdlv?: {
  id: number;
  name: string;
  phone: string;
 };
}

export interface DetailData {
 id: number;
 barcode: number;
 address: string;
 penerima: string;
 datacustomer?: {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  phone_clr: string;
 };
}

export interface HistoryResponse {
 code: number;
 status: string;
 pickup: number;
 ijinkan_berangkat: string;
 is_permission: number;
 data: {
  current_page: number;
  data: HistoryItem[];
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

export interface DetailResponse {
 data: DetailData;
}

export interface ScanResponse {
 code: number;
 status: string;
 message: string;
 data?: {
  barcode: string;
  status: string;
  message?: string;
 };
}
