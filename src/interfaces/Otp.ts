export interface Root {
  code: number
  status: string
  message: string
  token: string
  user: User
}

export interface User {
  id: number
  nik: number
  kitchen: number
  branch: number
  department: number
  division: number
  position: number
  partner_id: any
  religion: number
  liga: string
  leader: number
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
  role: number
  village: number
  postcode: number
  address: string
  dob: string
  gender: string
  gambar: string
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
  bank: number
  in_at: string
  out_at: any
  norek: string
  api_token: any
  lembur: string
  jatah_cuti: number
  ukuran_baju: any
  ukuran_sepatu: any
  template_absen: string
  vein_absen: string
  rfid_absen: any
  password_absen: any
  face_absen: string
  pin_absen: number
  emailperusahaan: any
  pwdemailperusahaan: any
  hpperusahaan: any
  nohpperusahaan: any
  pwdhpperusahaan: any
  laptopperusahaan: any
  pwdlaptopperusahaan: any
  created_at: string
  last_login: string
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
