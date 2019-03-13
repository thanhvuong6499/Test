import { ITheLoaiTieuChi } from './the-loai-tieu-chi.model';

export interface ITieuChiDanhGia {
  id?: number;
  noiDung?: string;
  level?: number;
  theloaitieuchi?: ITheLoaiTieuChi;
}

export const defaultValue: Readonly<ITieuChiDanhGia> = {};
