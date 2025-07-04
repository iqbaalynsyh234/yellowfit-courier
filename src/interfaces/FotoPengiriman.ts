import type { OrderDetailItem } from '@/lib/yellowfit-courier/api/dashboard';

export interface CameraModalPagesProps {
  order: OrderDetailItem;
  onClose?: () => void;
  onSave?: (data: {
    paketId: string;
    alamat: string;
    penerima: string;
    telepon: string;
    paket: string;
    catatan?: string;
    foto?: string | null;
  }) => void;
}

export interface FotoPengirimanData {
  paketId: string;
  alamat: string;
  penerima: string;
  telepon: string;
  paket: string;
  catatan?: string;
  foto?: string | null;
}
