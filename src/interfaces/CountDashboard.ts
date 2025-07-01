export interface Root {
  code: number
  status: string
  data: Data
}

export interface Data {
  production: string
  lastweek: number
  quality_control: string
  pickup: string
  not_pickup: string
  delivery: string
  on_progress: string
  done: string
}