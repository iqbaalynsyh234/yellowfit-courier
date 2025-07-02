export interface OrderSummaryRequest {
  tanggal: string;
}

export interface OrderSummaryResponse {
  code: number;
  status: string;
  count: number;
  task: number;
  pickup: number;
  delivered: number;
} 