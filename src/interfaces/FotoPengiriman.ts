import type { Daum } from './Dashboard';

export interface CameraModalPagesProps {
 order: Daum;
 onClose: () => void;
 onSave?: (formData: FormData) => void;
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
