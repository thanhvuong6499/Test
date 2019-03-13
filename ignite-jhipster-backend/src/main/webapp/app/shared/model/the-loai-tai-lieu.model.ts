import { ITaiLieu } from './tai-lieu.model';

export interface ITheLoaiTaiLieu {
  id?: number;
  noiDung?: string;
  tailieus?: ITaiLieu[];
}

export const defaultValue: Readonly<ITheLoaiTaiLieu> = {};
