import { IBanDanhGia } from './ban-danh-gia.model';
import { ITieuChiDanhGia } from './tieu-chi-danh-gia.model';

export const enum MucDiem {
  CHUADAT = 'CHUADAT',
  DAT = 'DAT',
  KHA = 'KHA',
  TOT = 'TOT'
}

export interface ICauTraLoi {
  id?: number;
  thangDiem?: MucDiem;
  bandanhgia?: IBanDanhGia;
  tieuchidanhgia?: ITieuChiDanhGia;
}

export const defaultValue: Readonly<ICauTraLoi> = {};
