export interface PickupDetailRequest {
 generate_code: string;
 tanggal: string;
}

export interface PickupBox {
 id: number | string;
 barcode: number;
 kodeproduksi: string;
 name?: string;
 penerima?: string;
 address?: string;
 alamat?: string;
 status?: string;
 sts_kirim?: string;
 kurirdmd?: string | number | null;
 request?: string;
 custom_request?: string | null;
 datacustomer?: {
  fname: string;
  lname: string;
  phone: string;
  phone_clr?: string;
  email: string;
  dob: string;
  age?: number;
  gender: string;
  email_verified_at: string | null;
  two_factor_code?: string;
  two_factor_expires_at: string | null;
  province: number;
  nm_province: string;
  city: number;
  nm_city: string;
  district: number;
  village: number;
  postcode: number;
  address: string;
  active: string;
  product: number;
  membership: string;
  membership_at?: string;
  token_activation?: string;
  isVerified: number;
  phone_verified_at?: string;
  expired_at: string | null;
  event: string;
  csevent: string;
  activationcode?: string;
  activationsignature?: string;
  prioritas_exp: string | null;
  prioritas_level: number;
  status: number;
  wl: string;
  cholstrl: string;
  dbts: string;
  wlplus: string;
  created_at?: string;
  updated_at: string;
  totalpax?: number;
  last_order: string;
  lastorder?: string;
 };
 datakurirdmd?: {
  name: string;
  phone: string;
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
 };
}
