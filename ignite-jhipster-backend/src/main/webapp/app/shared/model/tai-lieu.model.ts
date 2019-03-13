import { ITheLoaiTaiLieu } from './the-loai-tai-lieu.model';
import { IGiaoVien } from './giao-vien.model';

export const enum TrangThai {
  TONTAI = 'TONTAI',
  DAXOA = 'DAXOA'
}

export interface ITaiLieu {
  id?: number;
  tenVanBan?: string;
  tomTat?: string;
  uRL?: string;
  dungLuong?: number;
  tag?: string;
  status?: TrangThai;
  theloaitailieus?: ITheLoaiTaiLieu[];
  giaoviens?: IGiaoVien[];
}

export const defaultValue: Readonly<ITaiLieu> = {};
