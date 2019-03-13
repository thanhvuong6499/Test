import { ICoQuanBanHanh } from './co-quan-ban-hanh.model';
import { ITheLoaiVanBan } from './the-loai-van-ban.model';

export const enum TrangThai {
  TONTAI = 'TONTAI',
  DAXOA = 'DAXOA'
}

export interface IVanBan {
  id?: number;
  tenVanban?: string;
  tomTat?: string;
  uRL?: string;
  status?: TrangThai;
  coquanbanhanh?: ICoQuanBanHanh;
  theloaivanban?: ITheLoaiVanBan;
}

export const defaultValue: Readonly<IVanBan> = {};
