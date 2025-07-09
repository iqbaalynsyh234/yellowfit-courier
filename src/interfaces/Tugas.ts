export interface CustomerData {
 id: number;
 fname: string;
 lname: string;
 phone: string;
 address: string;
}

export interface TugasResponse {
 id: number;
 barcode: number;
 kodeproduksi: string;
 sesi: 'L' | 'D';
 customer: number;
 address: string;
 generate_code: string;
 sts_kirim: string;
 datacustomer: CustomerData;
}

export interface PaginatedData {
 current_page: number;
 data: TugasResponse[];
 first_page_url: string;
 from: number;
 last_page: number;
 last_page_url: string;
 links: {
  url: string | null;
  label: string;
  active: boolean;
 }[];
 next_page_url: string | null;
 path: string;
 per_page: number;
 prev_page_url: string | null;
 to: number;
 total: number;
}

export interface TugasApiResponse {
 code: number;
 status: string;
 pickup: number;
 ijinkan_berangkat: string;
 is_permission: number;
 data: PaginatedData;
}
