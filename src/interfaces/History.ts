export interface HistoryItem {
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
 sts_kirim: string;
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
