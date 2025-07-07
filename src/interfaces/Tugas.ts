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

export interface TugasApiResponse {
 code: number;
 status: string;
 pickup: number;
 ijinkan_berangkat: string;
 is_permission: number;
 data: {
  current_page: number;
  data: TugasResponse[];
 };
}
