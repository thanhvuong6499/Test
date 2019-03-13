import { Moment } from 'moment';
import { ITaiLieu } from './tai-lieu.model';

export const enum CapBacGV {
  GIAOVIEN = 'GIAOVIEN',
  TRUONGKHOA = 'TRUONGKHOA',
  CANBOCAPCAO = 'CANBOCAPCAO'
}

export const enum TrangThai {
  TONTAI = 'TONTAI',
  DAXOA = 'DAXOA'
}

export interface IGiaoVien {
  id?: number;
  cMND?: string;
  hoTen?: string;
  sDT?: string;
  ngaySinh?: Moment;
  queQuan?: string;
  diaChi?: string;
  email?: string;
  matKhau?: string;
  dungLuongKho?: number;
  daSuDung?: number;
  capBac?: CapBacGV;
  status?: TrangThai;
  tailieus?: ITaiLieu[];
}

export const defaultValue: Readonly<IGiaoVien> = {};
