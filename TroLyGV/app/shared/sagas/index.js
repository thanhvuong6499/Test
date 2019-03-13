import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { GiaoVienTypes } from '../../modules/entities/giao-vien/giao-vien.reducer'
import { TaiLieuTypes } from '../../modules/entities/tai-lieu/tai-lieu.reducer'
import { BanDanhGiaTypes } from '../../modules/entities/ban-danh-gia/ban-danh-gia.reducer'
import { CauTraLoiTypes } from '../../modules/entities/cau-tra-loi/cau-tra-loi.reducer'
import { CoQuanBanHanhTypes } from '../../modules/entities/co-quan-ban-hanh/co-quan-ban-hanh.reducer'
import { TheLoaiTaiLieuTypes } from '../../modules/entities/the-loai-tai-lieu/the-loai-tai-lieu.reducer'
import { TheLoaiTieuChiTypes } from '../../modules/entities/the-loai-tieu-chi/the-loai-tieu-chi.reducer'
import { TheLoaiVanBanTypes } from '../../modules/entities/the-loai-van-ban/the-loai-van-ban.reducer'
import { TieuChiDanhGiaTypes } from '../../modules/entities/tieu-chi-danh-gia/tieu-chi-danh-gia.reducer'
import { VanBanTypes } from '../../modules/entities/van-ban/van-ban.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import { getGiaoVien, getGiaoViens, updateGiaoVien, deleteGiaoVien, searchGiaoViens } from '../../modules/entities/giao-vien/giao-vien.sagas'
import { getTaiLieu, getTaiLieus, updateTaiLieu, deleteTaiLieu, searchTaiLieus } from '../../modules/entities/tai-lieu/tai-lieu.sagas'
import { getBanDanhGia, getBanDanhGias, updateBanDanhGia, deleteBanDanhGia, searchBanDanhGias } from '../../modules/entities/ban-danh-gia/ban-danh-gia.sagas'
import { getCauTraLoi, getCauTraLois, updateCauTraLoi, deleteCauTraLoi, searchCauTraLois } from '../../modules/entities/cau-tra-loi/cau-tra-loi.sagas'
import { getCoQuanBanHanh, getCoQuanBanHanhs, updateCoQuanBanHanh, deleteCoQuanBanHanh, searchCoQuanBanHanhs } from '../../modules/entities/co-quan-ban-hanh/co-quan-ban-hanh.sagas'
import { getTheLoaiTaiLieu, getTheLoaiTaiLieus, updateTheLoaiTaiLieu, deleteTheLoaiTaiLieu, searchTheLoaiTaiLieus } from '../../modules/entities/the-loai-tai-lieu/the-loai-tai-lieu.sagas'
import { getTheLoaiTieuChi, getTheLoaiTieuChis, updateTheLoaiTieuChi, deleteTheLoaiTieuChi, searchTheLoaiTieuChis } from '../../modules/entities/the-loai-tieu-chi/the-loai-tieu-chi.sagas'
import { getTheLoaiVanBan, getTheLoaiVanBans, updateTheLoaiVanBan, deleteTheLoaiVanBan, searchTheLoaiVanBans } from '../../modules/entities/the-loai-van-ban/the-loai-van-ban.sagas'
import { getTieuChiDanhGia, getTieuChiDanhGias, updateTieuChiDanhGia, deleteTieuChiDanhGia, searchTieuChiDanhGias } from '../../modules/entities/tieu-chi-danh-gia/tieu-chi-danh-gia.sagas'
import { getVanBan, getVanBans, updateVanBan, deleteVanBan, searchVanBans } from '../../modules/entities/van-ban/van-ban.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(GiaoVienTypes.GIAO_VIEN_REQUEST, getGiaoVien, api),
    takeLatest(GiaoVienTypes.GIAO_VIEN_ALL_REQUEST, getGiaoViens, api),
    takeLatest(GiaoVienTypes.GIAO_VIEN_UPDATE_REQUEST, updateGiaoVien, api),
    takeLatest(GiaoVienTypes.GIAO_VIEN_DELETE_REQUEST, deleteGiaoVien, api),
    takeLatest(GiaoVienTypes.GIAO_VIEN_SEARCH_REQUEST, searchGiaoViens, api),

    takeLatest(TaiLieuTypes.TAI_LIEU_REQUEST, getTaiLieu, api),
    takeLatest(TaiLieuTypes.TAI_LIEU_ALL_REQUEST, getTaiLieus, api),
    takeLatest(TaiLieuTypes.TAI_LIEU_UPDATE_REQUEST, updateTaiLieu, api),
    takeLatest(TaiLieuTypes.TAI_LIEU_DELETE_REQUEST, deleteTaiLieu, api),
    takeLatest(TaiLieuTypes.TAI_LIEU_SEARCH_REQUEST, searchTaiLieus, api),

    takeLatest(BanDanhGiaTypes.BAN_DANH_GIA_REQUEST, getBanDanhGia, api),
    takeLatest(BanDanhGiaTypes.BAN_DANH_GIA_ALL_REQUEST, getBanDanhGias, api),
    takeLatest(BanDanhGiaTypes.BAN_DANH_GIA_UPDATE_REQUEST, updateBanDanhGia, api),
    takeLatest(BanDanhGiaTypes.BAN_DANH_GIA_DELETE_REQUEST, deleteBanDanhGia, api),
    takeLatest(BanDanhGiaTypes.BAN_DANH_GIA_SEARCH_REQUEST, searchBanDanhGias, api),

    takeLatest(CauTraLoiTypes.CAU_TRA_LOI_REQUEST, getCauTraLoi, api),
    takeLatest(CauTraLoiTypes.CAU_TRA_LOI_ALL_REQUEST, getCauTraLois, api),
    takeLatest(CauTraLoiTypes.CAU_TRA_LOI_UPDATE_REQUEST, updateCauTraLoi, api),
    takeLatest(CauTraLoiTypes.CAU_TRA_LOI_DELETE_REQUEST, deleteCauTraLoi, api),
    takeLatest(CauTraLoiTypes.CAU_TRA_LOI_SEARCH_REQUEST, searchCauTraLois, api),

    takeLatest(CoQuanBanHanhTypes.CO_QUAN_BAN_HANH_REQUEST, getCoQuanBanHanh, api),
    takeLatest(CoQuanBanHanhTypes.CO_QUAN_BAN_HANH_ALL_REQUEST, getCoQuanBanHanhs, api),
    takeLatest(CoQuanBanHanhTypes.CO_QUAN_BAN_HANH_UPDATE_REQUEST, updateCoQuanBanHanh, api),
    takeLatest(CoQuanBanHanhTypes.CO_QUAN_BAN_HANH_DELETE_REQUEST, deleteCoQuanBanHanh, api),
    takeLatest(CoQuanBanHanhTypes.CO_QUAN_BAN_HANH_SEARCH_REQUEST, searchCoQuanBanHanhs, api),

    takeLatest(TheLoaiTaiLieuTypes.THE_LOAI_TAI_LIEU_REQUEST, getTheLoaiTaiLieu, api),
    takeLatest(TheLoaiTaiLieuTypes.THE_LOAI_TAI_LIEU_ALL_REQUEST, getTheLoaiTaiLieus, api),
    takeLatest(TheLoaiTaiLieuTypes.THE_LOAI_TAI_LIEU_UPDATE_REQUEST, updateTheLoaiTaiLieu, api),
    takeLatest(TheLoaiTaiLieuTypes.THE_LOAI_TAI_LIEU_DELETE_REQUEST, deleteTheLoaiTaiLieu, api),
    takeLatest(TheLoaiTaiLieuTypes.THE_LOAI_TAI_LIEU_SEARCH_REQUEST, searchTheLoaiTaiLieus, api),

    takeLatest(TheLoaiTieuChiTypes.THE_LOAI_TIEU_CHI_REQUEST, getTheLoaiTieuChi, api),
    takeLatest(TheLoaiTieuChiTypes.THE_LOAI_TIEU_CHI_ALL_REQUEST, getTheLoaiTieuChis, api),
    takeLatest(TheLoaiTieuChiTypes.THE_LOAI_TIEU_CHI_UPDATE_REQUEST, updateTheLoaiTieuChi, api),
    takeLatest(TheLoaiTieuChiTypes.THE_LOAI_TIEU_CHI_DELETE_REQUEST, deleteTheLoaiTieuChi, api),
    takeLatest(TheLoaiTieuChiTypes.THE_LOAI_TIEU_CHI_SEARCH_REQUEST, searchTheLoaiTieuChis, api),

    takeLatest(TheLoaiVanBanTypes.THE_LOAI_VAN_BAN_REQUEST, getTheLoaiVanBan, api),
    takeLatest(TheLoaiVanBanTypes.THE_LOAI_VAN_BAN_ALL_REQUEST, getTheLoaiVanBans, api),
    takeLatest(TheLoaiVanBanTypes.THE_LOAI_VAN_BAN_UPDATE_REQUEST, updateTheLoaiVanBan, api),
    takeLatest(TheLoaiVanBanTypes.THE_LOAI_VAN_BAN_DELETE_REQUEST, deleteTheLoaiVanBan, api),
    takeLatest(TheLoaiVanBanTypes.THE_LOAI_VAN_BAN_SEARCH_REQUEST, searchTheLoaiVanBans, api),

    takeLatest(TieuChiDanhGiaTypes.TIEU_CHI_DANH_GIA_REQUEST, getTieuChiDanhGia, api),
    takeLatest(TieuChiDanhGiaTypes.TIEU_CHI_DANH_GIA_ALL_REQUEST, getTieuChiDanhGias, api),
    takeLatest(TieuChiDanhGiaTypes.TIEU_CHI_DANH_GIA_UPDATE_REQUEST, updateTieuChiDanhGia, api),
    takeLatest(TieuChiDanhGiaTypes.TIEU_CHI_DANH_GIA_DELETE_REQUEST, deleteTieuChiDanhGia, api),
    takeLatest(TieuChiDanhGiaTypes.TIEU_CHI_DANH_GIA_SEARCH_REQUEST, searchTieuChiDanhGias, api),

    takeLatest(VanBanTypes.VAN_BAN_REQUEST, getVanBan, api),
    takeLatest(VanBanTypes.VAN_BAN_ALL_REQUEST, getVanBans, api),
    takeLatest(VanBanTypes.VAN_BAN_UPDATE_REQUEST, updateVanBan, api),
    takeLatest(VanBanTypes.VAN_BAN_DELETE_REQUEST, deleteVanBan, api),
    takeLatest(VanBanTypes.VAN_BAN_SEARCH_REQUEST, searchVanBans, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
