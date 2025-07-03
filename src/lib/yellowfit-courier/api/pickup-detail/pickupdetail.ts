const Tugas = {
  getTugasList: async (
    tanggal: string,
    token: string
  ): Promise<> => {
    const query = tanggal ? `?tanggal=${encodeURIComponent(tanggal)}` : '';
    const response = await fetch(`/api/tugas${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  },
}

export interface PickupDetailRequest {
  generate_code: string;
  tanggal: string;
}

export interface PickupDetailItem {
  // Tambahkan field sesuai response detail pickup
  id: number;
  // ... tambahkan field lain jika ada
}

export interface PickupDetailResponse {
  code: number;
  status: string;
  pickup: number;
  ijinkan_berangkat: string;
  is_permission: number;
  data: any; // bisa diganti dengan tipe detail jika sudah tahu
}

export async function getPickupDetailByGenerateCode(
  generate_code: string,
  tanggal: string,
  token: string
): Promise<PickupDetailResponse> {
  const response = await fetch('/api/pickup-detail', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ generate_code, tanggal }),
  });
  return await response.json();
}