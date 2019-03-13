// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/authenticate', userAuth)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) => api.post('api/account/reset-password/init', data, {headers: {'Content-Type': 'text/plain', 'Accept': 'application/json, text/plain, */*'}})

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) => api.post('api/account/change-password', {currentPassword, newPassword}, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*'}})

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getGiaoVien = (giaoVienId) => api.get('api/giao-viens/' + giaoVienId)
  const getGiaoViens = (options) => api.get('api/giao-viens', options)
  const createGiaoVien = (giaoVien) => api.post('api/giao-viens', giaoVien)
  const updateGiaoVien = (giaoVien) => api.put('api/giao-viens', giaoVien)
  const deleteGiaoVien = (giaoVienId) => api.delete('api/giao-viens/' + giaoVienId)
  const searchGiaoViens = (query) => api.get('api/_search/giao-viens', { query: query })

  const getTaiLieu = (taiLieuId) => api.get('api/tai-lieus/' + taiLieuId)
  const getTaiLieus = (options) => api.get('api/tai-lieus', options)
  const createTaiLieu = (taiLieu) => api.post('api/tai-lieus', taiLieu)
  const updateTaiLieu = (taiLieu) => api.put('api/tai-lieus', taiLieu)
  const deleteTaiLieu = (taiLieuId) => api.delete('api/tai-lieus/' + taiLieuId)
  const searchTaiLieus = (query) => api.get('api/_search/tai-lieus', { query: query })

  const getBanDanhGia = (banDanhGiaId) => api.get('api/ban-danh-gias/' + banDanhGiaId)
  const getBanDanhGias = (options) => api.get('api/ban-danh-gias', options)
  const createBanDanhGia = (banDanhGia) => api.post('api/ban-danh-gias', banDanhGia)
  const updateBanDanhGia = (banDanhGia) => api.put('api/ban-danh-gias', banDanhGia)
  const deleteBanDanhGia = (banDanhGiaId) => api.delete('api/ban-danh-gias/' + banDanhGiaId)
  const searchBanDanhGias = (query) => api.get('api/_search/ban-danh-gias', { query: query })

  const getCauTraLoi = (cauTraLoiId) => api.get('api/cau-tra-lois/' + cauTraLoiId)
  const getCauTraLois = (options) => api.get('api/cau-tra-lois', options)
  const createCauTraLoi = (cauTraLoi) => api.post('api/cau-tra-lois', cauTraLoi)
  const updateCauTraLoi = (cauTraLoi) => api.put('api/cau-tra-lois', cauTraLoi)
  const deleteCauTraLoi = (cauTraLoiId) => api.delete('api/cau-tra-lois/' + cauTraLoiId)
  const searchCauTraLois = (query) => api.get('api/_search/cau-tra-lois', { query: query })

  const getCoQuanBanHanh = (coQuanBanHanhId) => api.get('api/co-quan-ban-hanhs/' + coQuanBanHanhId)
  const getCoQuanBanHanhs = (options) => api.get('api/co-quan-ban-hanhs', options)
  const createCoQuanBanHanh = (coQuanBanHanh) => api.post('api/co-quan-ban-hanhs', coQuanBanHanh)
  const updateCoQuanBanHanh = (coQuanBanHanh) => api.put('api/co-quan-ban-hanhs', coQuanBanHanh)
  const deleteCoQuanBanHanh = (coQuanBanHanhId) => api.delete('api/co-quan-ban-hanhs/' + coQuanBanHanhId)
  const searchCoQuanBanHanhs = (query) => api.get('api/_search/co-quan-ban-hanhs', { query: query })

  const getTheLoaiTaiLieu = (theLoaiTaiLieuId) => api.get('api/the-loai-tai-lieus/' + theLoaiTaiLieuId)
  const getTheLoaiTaiLieus = (options) => api.get('api/the-loai-tai-lieus', options)
  const createTheLoaiTaiLieu = (theLoaiTaiLieu) => api.post('api/the-loai-tai-lieus', theLoaiTaiLieu)
  const updateTheLoaiTaiLieu = (theLoaiTaiLieu) => api.put('api/the-loai-tai-lieus', theLoaiTaiLieu)
  const deleteTheLoaiTaiLieu = (theLoaiTaiLieuId) => api.delete('api/the-loai-tai-lieus/' + theLoaiTaiLieuId)
  const searchTheLoaiTaiLieus = (query) => api.get('api/_search/the-loai-tai-lieus', { query: query })

  const getTheLoaiTieuChi = (theLoaiTieuChiId) => api.get('api/the-loai-tieu-chis/' + theLoaiTieuChiId)
  const getTheLoaiTieuChis = (options) => api.get('api/the-loai-tieu-chis', options)
  const createTheLoaiTieuChi = (theLoaiTieuChi) => api.post('api/the-loai-tieu-chis', theLoaiTieuChi)
  const updateTheLoaiTieuChi = (theLoaiTieuChi) => api.put('api/the-loai-tieu-chis', theLoaiTieuChi)
  const deleteTheLoaiTieuChi = (theLoaiTieuChiId) => api.delete('api/the-loai-tieu-chis/' + theLoaiTieuChiId)
  const searchTheLoaiTieuChis = (query) => api.get('api/_search/the-loai-tieu-chis', { query: query })

  const getTheLoaiVanBan = (theLoaiVanBanId) => api.get('api/the-loai-van-bans/' + theLoaiVanBanId)
  const getTheLoaiVanBans = (options) => api.get('api/the-loai-van-bans', options)
  const createTheLoaiVanBan = (theLoaiVanBan) => api.post('api/the-loai-van-bans', theLoaiVanBan)
  const updateTheLoaiVanBan = (theLoaiVanBan) => api.put('api/the-loai-van-bans', theLoaiVanBan)
  const deleteTheLoaiVanBan = (theLoaiVanBanId) => api.delete('api/the-loai-van-bans/' + theLoaiVanBanId)
  const searchTheLoaiVanBans = (query) => api.get('api/_search/the-loai-van-bans', { query: query })

  const getTieuChiDanhGia = (tieuChiDanhGiaId) => api.get('api/tieu-chi-danh-gias/' + tieuChiDanhGiaId)
  const getTieuChiDanhGias = (options) => api.get('api/tieu-chi-danh-gias', options)
  const createTieuChiDanhGia = (tieuChiDanhGia) => api.post('api/tieu-chi-danh-gias', tieuChiDanhGia)
  const updateTieuChiDanhGia = (tieuChiDanhGia) => api.put('api/tieu-chi-danh-gias', tieuChiDanhGia)
  const deleteTieuChiDanhGia = (tieuChiDanhGiaId) => api.delete('api/tieu-chi-danh-gias/' + tieuChiDanhGiaId)
  const searchTieuChiDanhGias = (query) => api.get('api/_search/tieu-chi-danh-gias', { query: query })

  const getVanBan = (vanBanId) => api.get('api/van-bans/' + vanBanId)
  const getVanBans = (options) => api.get('api/van-bans', options)
  const createVanBan = (vanBan) => api.post('api/van-bans', vanBan)
  const updateVanBan = (vanBan) => api.put('api/van-bans', vanBan)
  const deleteVanBan = (vanBanId) => api.delete('api/van-bans/' + vanBanId)
  const searchVanBans = (query) => api.get('api/_search/van-bans', { query: query })
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createGiaoVien,
    updateGiaoVien,
    getGiaoViens,
    getGiaoVien,
    deleteGiaoVien,
    searchGiaoViens,

    createTaiLieu,
    updateTaiLieu,
    getTaiLieus,
    getTaiLieu,
    deleteTaiLieu,
    searchTaiLieus,

    createBanDanhGia,
    updateBanDanhGia,
    getBanDanhGias,
    getBanDanhGia,
    deleteBanDanhGia,
    searchBanDanhGias,

    createCauTraLoi,
    updateCauTraLoi,
    getCauTraLois,
    getCauTraLoi,
    deleteCauTraLoi,
    searchCauTraLois,

    createCoQuanBanHanh,
    updateCoQuanBanHanh,
    getCoQuanBanHanhs,
    getCoQuanBanHanh,
    deleteCoQuanBanHanh,
    searchCoQuanBanHanhs,

    createTheLoaiTaiLieu,
    updateTheLoaiTaiLieu,
    getTheLoaiTaiLieus,
    getTheLoaiTaiLieu,
    deleteTheLoaiTaiLieu,
    searchTheLoaiTaiLieus,

    createTheLoaiTieuChi,
    updateTheLoaiTieuChi,
    getTheLoaiTieuChis,
    getTheLoaiTieuChi,
    deleteTheLoaiTieuChi,
    searchTheLoaiTieuChis,

    createTheLoaiVanBan,
    updateTheLoaiVanBan,
    getTheLoaiVanBans,
    getTheLoaiVanBan,
    deleteTheLoaiVanBan,
    searchTheLoaiVanBans,

    createTieuChiDanhGia,
    updateTieuChiDanhGia,
    getTieuChiDanhGias,
    getTieuChiDanhGia,
    deleteTieuChiDanhGia,
    searchTieuChiDanhGias,

    createVanBan,
    updateVanBan,
    getVanBans,
    getVanBan,
    deleteVanBan,
    searchVanBans,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword
  }
}

// let's return back our create method as the default.
export default {
  create
}
