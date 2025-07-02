export interface PickupItem {
  id: number;
  tanggal: string;
  generate_code: string;
  sesi: string;
  namacabang: string;
  databranch: any;
}

export interface PickupPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PickupPaginationData {
  current_page: number;
  data: PickupItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PickupPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PickupApiResponse {
  code: number;
  status: string;
  count: number;
  data: PickupPaginationData;
}

export interface PickupRequest {
  page?: number;
  per_page?: number;
  tanggal?: string;
}
