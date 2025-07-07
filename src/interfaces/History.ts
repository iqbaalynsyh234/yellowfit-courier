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
 data: {
  data: HistoryItem[];
 };
}

export interface DetailResponse {
 data: DetailData;
}