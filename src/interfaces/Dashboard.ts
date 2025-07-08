export interface Root {
 code: number;
 status: string;
 pickup: number;
 ijinkan_berangkat: string;
 is_permission: number;
 data: Data;
}

export interface Data {
 current_page: number;
 data: Daum[];
 first_page_url: string;
 from: number;
 last_page: number;
 last_page_url: string;
 links: Link[];
 next_page_url: string;
 path: string;
 per_page: number;
 prev_page_url: string | null;
 to: number;
 total: number;
}

export interface Daum {
 id: number;
 parentcode: number;
 barcode: number;
 seq: number;
 kodeproduksi: string;
 sesi: string;
 prioritas: number;
 productcategory: number;
 tipeitem: string;
 tipemenu: string;
 qty: number;
 request: string;
 cutlery: number;
 tanggal: string;
 branch: number;
 kloter: string;
 customer: number;
 province: number;
 city: number;
 district: number;
 village: number;
 postcode: number;
 address: string;
 kurir: number;
 kurirdmd: number;
 kurirdlv: number;
 scan_kurir: number;
 scan_prepare: string | null;
 scan_qc: number;
 created_user: number;
 updated_user: number | null;
 inisial: string;
 generate_code: string;
 status: string;
 created_at: string;
 updated_at: string;
 gambar: string;
 penerima: string;
 description: string | null;
 sts_kirim: string;
 custom_request: string | null;
 is_permission: string;
 is_called: string;
 scan_at: string | null;
 done_at: string;
 pickup_at: string | null;
 message: string;
 datacustomer: Datacustomer;
 datakurirdmd: Datakurirdmd;
 datakurirdlv: Datakurirdlv;
 dataorderdeliverylog: Dataorderdeliverylog[];
}

export interface Datacustomer {
 id: number;
 uuid: string;
 fname: string;
 lname: string;
 phone: string;
 phone_clr?: string;
 email: string;
 dob: string;
 age: number;
 gender: string;
 email_verified_at?: string;
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
 phone_verified_at: string | null;
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
}

export interface Datakurirdmd {
 id: number;
 nik: number;
 kitchen: number;
 branch: number;
 department: number;
 division: number;
 position: number;
 partner_id: string | null;
 religion: string | null;
 liga: string | null;
 leader: string | null;
 name: string;
 phone: string;
 email_freshchat: string | null;
 email: string;
 email_verified_at: string | null;
 two_factor_code: string | null;
 two_factor_expires_at: string | null;
 permission: string;
 province: number;
 city: number;
 district: number;
 role: string | null;
 village: number;
 postcode: number;
 address: string;
 dob: string;
 gender: string;
 gambar: string | null;
 is_agentactive: string;
 active: string;
 theme: string;
 target_dinner_weekend: string;
 target_dinner_weekday: string;
 target_lunch_weekend: string;
 target_monthly: string;
 target_lunch_weekday: string;
 tarif: number;
 point: number;
 gp: number;
 th_weekday: number;
 th_weekend: number;
 tr: number;
 bpjstk_user: number;
 bpjstk_prsh: number;
 bpjskes_user: number;
 bpjskes_prsh: number;
 bank: string | null;
 in_at: string;
 out_at: string | null;
 norek: string | null;
 api_token: string | null;
 lembur: string;
 jatah_cuti: number;
 ukuran_baju: string | null;
 ukuran_sepatu: string | null;
 template_absen: string | null;
 vein_absen: string | null;
 rfid_absen: string | null;
 password_absen: string | null;
 face_absen: string | null;
 pin_absen: string | null;
 emailperusahaan: string | null;
 pwdemailperusahaan: string | null;
 hpperusahaan: string | null;
 nohpperusahaan: string | null;
 pwdhpperusahaan: string | null;
 laptopperusahaan: string | null;
 pwdlaptopperusahaan: string | null;
 created_at: string;
 last_login?: string;
 updated_at: string;
 datadivision: Datadivision;
 dataposition: Dataposition;
}

export interface Datadivision {
 id: number;
 inisial: string;
 name: string;
 department: number;
 active: string;
 created_at: string;
 updated_at: string;
 datadepartment: Datadepartment;
}

export interface Datadepartment {
 id: number;
 name: string;
 created_at: string;
 updated_at: string;
}

export interface Dataposition {
 id: number;
 name: string;
 level: number;
 active: string;
 created_at: string;
 updated_at: string;
}

export interface Datakurirdlv {
 id: number;
 nik: number;
 kitchen: number;
 branch: number;
 department: number;
 division: number;
 position: number;
 partner_id: string | null;
 religion: string | null;
 liga: string | null;
 leader: string | null;
 name: string;
 phone: string;
 email_freshchat: string | null;
 email: string;
 email_verified_at: string | null;
 two_factor_code: string | null;
 two_factor_expires_at: string | null;
 permission: string;
 province: number;
 city: number;
 district: number;
 role: string | null;
 village: number;
 postcode: number;
 address: string;
 dob: string;
 gender: string;
 gambar: string | null;
 is_agentactive: string;
 active: string;
 theme: string;
 target_dinner_weekend: string;
 target_dinner_weekday: string;
 target_lunch_weekend: string;
 target_monthly: string;
 target_lunch_weekday: string;
 tarif: number;
 point: number;
 gp: number;
 th_weekday: number;
 th_weekend: number;
 tr: number;
 bpjstk_user: number;
 bpjstk_prsh: number;
 bpjskes_user: number;
 bpjskes_prsh: number;
 bank: string | null;
 in_at: string;
 out_at: string | null;
 norek: string | null;
 api_token: string | null;
 lembur: string;
 jatah_cuti: number;
 ukuran_baju: string | null;
 ukuran_sepatu: string | null;
 template_absen: string | null;
 vein_absen: string | null;
 rfid_absen: string | null;
 password_absen: string | null;
 face_absen: string | null;
 pin_absen: string | null;
 emailperusahaan: string | null;
 pwdemailperusahaan: string | null;
 hpperusahaan: string | null;
 nohpperusahaan: string | null;
 pwdhpperusahaan: string | null;
 laptopperusahaan: string | null;
 pwdlaptopperusahaan: string | null;
 created_at: string;
 last_login?: string;
 updated_at: string;
 datadivision: Datadivision2;
 dataposition: Dataposition2;
}

export interface Datadivision2 {
 id: number;
 inisial: string;
 name: string;
 department: number;
 active: string;
 created_at: string;
 updated_at: string;
 datadepartment: Datadepartment2;
}

export interface Datadepartment2 {
 id: number;
 name: string;
 created_at: string;
 updated_at: string;
}

export interface Dataposition2 {
 id: number;
 name: string;
 level: number;
 active: string;
 created_at: string;
 updated_at: string;
}

export interface Dataorderdeliverylog {
 id: number;
 barcode: number;
 user_id: number;
 status: string;
 kurir_id?: number;
 created_at: string;
 updated_at: string;
}

export interface Link {
 url?: string;
 label: string;
 active: boolean;
}

export interface OrderSummaryResponse {
 code: number;
 status: string;
 count: number;
 task: number;
 pickup: number;
 delivered: number;
}

export interface ScanResponse {
 code: number;
 status: string;
 message: string;
 data: {
  phone: string;
  message: string;
  data: Daum;
 };
}
