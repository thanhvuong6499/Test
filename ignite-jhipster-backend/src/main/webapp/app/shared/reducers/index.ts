import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import giaoVien, {
  GiaoVienState
} from 'app/entities/giao-vien/giao-vien.reducer';
// prettier-ignore
import taiLieu, {
  TaiLieuState
} from 'app/entities/tai-lieu/tai-lieu.reducer';
// prettier-ignore
import theLoaiTaiLieu, {
  TheLoaiTaiLieuState
} from 'app/entities/the-loai-tai-lieu/the-loai-tai-lieu.reducer';
// prettier-ignore
import vanBan, {
  VanBanState
} from 'app/entities/van-ban/van-ban.reducer';
// prettier-ignore
import theLoaiVanBan, {
  TheLoaiVanBanState
} from 'app/entities/the-loai-van-ban/the-loai-van-ban.reducer';
// prettier-ignore
import coQuanBanHanh, {
  CoQuanBanHanhState
} from 'app/entities/co-quan-ban-hanh/co-quan-ban-hanh.reducer';
// prettier-ignore
import theLoaiTieuChi, {
  TheLoaiTieuChiState
} from 'app/entities/the-loai-tieu-chi/the-loai-tieu-chi.reducer';
// prettier-ignore
import cauTraLoi, {
  CauTraLoiState
} from 'app/entities/cau-tra-loi/cau-tra-loi.reducer';
// prettier-ignore
import tieuChiDanhGia, {
  TieuChiDanhGiaState
} from 'app/entities/tieu-chi-danh-gia/tieu-chi-danh-gia.reducer';
// prettier-ignore
import banDanhGia, {
  BanDanhGiaState
} from 'app/entities/ban-danh-gia/ban-danh-gia.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly giaoVien: GiaoVienState;
  readonly taiLieu: TaiLieuState;
  readonly theLoaiTaiLieu: TheLoaiTaiLieuState;
  readonly vanBan: VanBanState;
  readonly theLoaiVanBan: TheLoaiVanBanState;
  readonly coQuanBanHanh: CoQuanBanHanhState;
  readonly theLoaiTieuChi: TheLoaiTieuChiState;
  readonly cauTraLoi: CauTraLoiState;
  readonly tieuChiDanhGia: TieuChiDanhGiaState;
  readonly banDanhGia: BanDanhGiaState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  giaoVien,
  taiLieu,
  theLoaiTaiLieu,
  vanBan,
  theLoaiVanBan,
  coQuanBanHanh,
  theLoaiTieuChi,
  cauTraLoi,
  tieuChiDanhGia,
  banDanhGia,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
