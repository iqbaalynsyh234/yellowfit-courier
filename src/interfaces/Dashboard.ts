export interface Root {
  code: number
  status: string
  pickup: number
  ijinkan_berangkat: string
  is_permission: number
  data: Data
}

export interface Data {
  current_page: number
  data: Daum[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface Daum {
  id: number
  parentcode: number
  barcode: number
  seq: number
  kodeproduksi: string
  sesi: string
  prioritas: number
  productcategory: number
  tipeitem: string
  tipemenu: string
  qty: number
  request: string
  cutlery: number
  tanggal: string
  branch: number
  kloter: string
  customer: number
  province: number
  city: number
  district: number
  village: number
  postcode: number
  address: string
  kurir: number
  kurirdmd: number
  kurirdlv: number
  scan_kurir: number
  scan_prepare: any
  scan_qc: number
  created_user: number
  updated_user: any
  inisial: string
  generate_code: string
  status: string
  created_at: string
  updated_at: string
  gambar: string
  penerima: string
  description: any
  sts_kirim: string
  custom_request: any
  is_permission: string
  is_called: string
  scan_at: any
  done_at: string
  pickup_at: any
  message: string
  datacustomer: Datacustomer
  datakurirdmd: Datakurirdmd
  datakurirdlv: Datakurirdlv
  dataorderdeliverylog: Dataorderdeliverylog[]
}

export interface Datacustomer {
  id: number
  uuid: string
  fname: string
  lname: string
  phone: string
  phone_clr?: string
  email: string
  dob: string
  age: number
  gender: string
  email_verified_at?: string
  two_factor_code?: string
  two_factor_expires_at: any
  province: number
  nm_province: string
  city: number
  nm_city: string
  district: number
  village: number
  postcode: number
  address: string
  active: string
  product: number
  membership: string
  membership_at?: string
  token_activation?: string
  isVerified: number
  phone_verified_at: any
  expired_at: any
  event: string
  csevent: string
  activationcode?: string
  activationsignature?: string
  prioritas_exp: any
  prioritas_level: number
  status: number
  wl: string
  cholstrl: string
  dbts: string
  wlplus: string
  created_at?: string
  updated_at: string
  totalpax?: number
  last_order: string
  lastorder?: string
}

export interface Datakurirdmd {
  id: number
  nik: number
  kitchen: number
  branch: number
  department: number
  division: number
  position: number
  partner_id: any
  religion: any
  liga: any
  leader: any
  name: string
  phone: string
  email_freshchat: any
  email: string
  email_verified_at: any
  two_factor_code: any
  two_factor_expires_at: any
  permission: string
  province: number
  city: number
  district: number
  role: any
  village: number
  postcode: number
  address: string
  dob: string
  gender: string
  gambar: any
  is_agentactive: string
  active: string
  theme: string
  target_dinner_weekend: string
  target_dinner_weekday: string
  target_lunch_weekend: string
  target_monthly: string
  target_lunch_weekday: string
  tarif: number
  point: number
  gp: number
  th_weekday: number
  th_weekend: number
  tr: number
  bpjstk_user: number
  bpjstk_prsh: number
  bpjskes_user: number
  bpjskes_prsh: number
  bank: any
  in_at: string
  out_at: any
  norek: any
  api_token: any
  lembur: string
  jatah_cuti: number
  ukuran_baju: any
  ukuran_sepatu: any
  template_absen: any
  vein_absen: any
  rfid_absen: any
  password_absen: any
  face_absen: any
  pin_absen: any
  emailperusahaan: any
  pwdemailperusahaan: any
  hpperusahaan: any
  nohpperusahaan: any
  pwdhpperusahaan: any
  laptopperusahaan: any
  pwdlaptopperusahaan: any
  created_at: string
  last_login?: string
  updated_at: string
  datadivision: Datadivision
  dataposition: Dataposition
}

export interface Datadivision {
  id: number
  inisial: string
  name: string
  department: number
  active: string
  created_at: string
  updated_at: string
  datadepartment: Datadepartment
}

export interface Datadepartment {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface Dataposition {
  id: number
  name: string
  level: number
  active: string
  created_at: string
  updated_at: string
}

export interface Datakurirdlv {
  id: number
  nik: number
  kitchen: number
  branch: number
  department: number
  division: number
  position: number
  partner_id: any
  religion: any
  liga: any
  leader: any
  name: string
  phone: string
  email_freshchat: any
  email: string
  email_verified_at: any
  two_factor_code: any
  two_factor_expires_at: any
  permission: string
  province: number
  city: number
  district: number
  role: any
  village: number
  postcode: number
  address: string
  dob: string
  gender: string
  gambar: any
  is_agentactive: string
  active: string
  theme: string
  target_dinner_weekend: string
  target_dinner_weekday: string
  target_lunch_weekend: string
  target_monthly: string
  target_lunch_weekday: string
  tarif: number
  point: number
  gp: number
  th_weekday: number
  th_weekend: number
  tr: number
  bpjstk_user: number
  bpjstk_prsh: number
  bpjskes_user: number
  bpjskes_prsh: number
  bank: any
  in_at: string
  out_at: any
  norek: any
  api_token: any
  lembur: string
  jatah_cuti: number
  ukuran_baju: any
  ukuran_sepatu: any
  template_absen: any
  vein_absen: any
  rfid_absen: any
  password_absen: any
  face_absen: any
  pin_absen: any
  emailperusahaan: any
  pwdemailperusahaan: any
  hpperusahaan: any
  nohpperusahaan: any
  pwdhpperusahaan: any
  laptopperusahaan: any
  pwdlaptopperusahaan: any
  created_at: string
  last_login?: string
  updated_at: string
  datadivision: Datadivision2
  dataposition: Dataposition2
}

export interface Datadivision2 {
  id: number
  inisial: string
  name: string
  department: number
  active: string
  created_at: string
  updated_at: string
  datadepartment: Datadepartment2
}

export interface Datadepartment2 {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface Dataposition2 {
  id: number
  name: string
  level: number
  active: string
  created_at: string
  updated_at: string
}

export interface Dataorderdeliverylog {
  id: number
  barcode: number
  user_id: number
  status: string
  kurir_id?: number
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}

export interface OrderSummaryResponse {
  code: number;
  status: string;
  count: number;
  task: number;
  pickup: number;
  delivered: number;
}
