import { IGiaoVien } from './giao-vien.model';

export interface IBanDanhGia {
  id?: number;
  moTa?: string;
  giaovien?: IGiaoVien;
}

export const defaultValue: Readonly<IBanDanhGia> = {};
