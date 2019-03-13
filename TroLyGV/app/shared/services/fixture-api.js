export default {
  // Functions return fixtures

  // entity fixtures

  updateGiaoVien: (giaoVien) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateGiaoVien.json')
    }
  },
  getGiaoViens: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getGiaoViens.json')
    }
  },
  getGiaoVien: (giaoVienId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getGiaoVien.json')
    }
  },
  deleteGiaoVien: (giaoVienId) => {
    return {
      ok: true
    }
  },
  searchGiaoViens: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchGiaoViens.json')
    }
  },

  updateTaiLieu: (taiLieu) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateTaiLieu.json')
    }
  },
  getTaiLieus: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTaiLieus.json')
    }
  },
  getTaiLieu: (taiLieuId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTaiLieu.json')
    }
  },
  deleteTaiLieu: (taiLieuId) => {
    return {
      ok: true
    }
  },
  searchTaiLieus: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchTaiLieus.json')
    }
  },

  updateBanDanhGia: (banDanhGia) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateBanDanhGia.json')
    }
  },
  getBanDanhGias: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getBanDanhGias.json')
    }
  },
  getBanDanhGia: (banDanhGiaId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getBanDanhGia.json')
    }
  },
  deleteBanDanhGia: (banDanhGiaId) => {
    return {
      ok: true
    }
  },
  searchBanDanhGias: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchBanDanhGias.json')
    }
  },

  updateCauTraLoi: (cauTraLoi) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateCauTraLoi.json')
    }
  },
  getCauTraLois: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCauTraLois.json')
    }
  },
  getCauTraLoi: (cauTraLoiId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCauTraLoi.json')
    }
  },
  deleteCauTraLoi: (cauTraLoiId) => {
    return {
      ok: true
    }
  },
  searchCauTraLois: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchCauTraLois.json')
    }
  },

  updateCoQuanBanHanh: (coQuanBanHanh) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateCoQuanBanHanh.json')
    }
  },
  getCoQuanBanHanhs: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCoQuanBanHanhs.json')
    }
  },
  getCoQuanBanHanh: (coQuanBanHanhId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCoQuanBanHanh.json')
    }
  },
  deleteCoQuanBanHanh: (coQuanBanHanhId) => {
    return {
      ok: true
    }
  },
  searchCoQuanBanHanhs: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchCoQuanBanHanhs.json')
    }
  },

  updateTheLoaiTaiLieu: (theLoaiTaiLieu) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateTheLoaiTaiLieu.json')
    }
  },
  getTheLoaiTaiLieus: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTheLoaiTaiLieus.json')
    }
  },
  getTheLoaiTaiLieu: (theLoaiTaiLieuId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTheLoaiTaiLieu.json')
    }
  },
  deleteTheLoaiTaiLieu: (theLoaiTaiLieuId) => {
    return {
      ok: true
    }
  },
  searchTheLoaiTaiLieus: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchTheLoaiTaiLieus.json')
    }
  },

  updateTheLoaiTieuChi: (theLoaiTieuChi) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateTheLoaiTieuChi.json')
    }
  },
  getTheLoaiTieuChis: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTheLoaiTieuChis.json')
    }
  },
  getTheLoaiTieuChi: (theLoaiTieuChiId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTheLoaiTieuChi.json')
    }
  },
  deleteTheLoaiTieuChi: (theLoaiTieuChiId) => {
    return {
      ok: true
    }
  },
  searchTheLoaiTieuChis: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchTheLoaiTieuChis.json')
    }
  },

  updateTheLoaiVanBan: (theLoaiVanBan) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateTheLoaiVanBan.json')
    }
  },
  getTheLoaiVanBans: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTheLoaiVanBans.json')
    }
  },
  getTheLoaiVanBan: (theLoaiVanBanId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTheLoaiVanBan.json')
    }
  },
  deleteTheLoaiVanBan: (theLoaiVanBanId) => {
    return {
      ok: true
    }
  },
  searchTheLoaiVanBans: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchTheLoaiVanBans.json')
    }
  },

  updateTieuChiDanhGia: (tieuChiDanhGia) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateTieuChiDanhGia.json')
    }
  },
  getTieuChiDanhGias: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTieuChiDanhGias.json')
    }
  },
  getTieuChiDanhGia: (tieuChiDanhGiaId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTieuChiDanhGia.json')
    }
  },
  deleteTieuChiDanhGia: (tieuChiDanhGiaId) => {
    return {
      ok: true
    }
  },
  searchTieuChiDanhGias: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchTieuChiDanhGias.json')
    }
  },

  updateVanBan: (vanBan) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateVanBan.json')
    }
  },
  getVanBans: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getVanBans.json')
    }
  },
  getVanBan: (vanBanId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getVanBan.json')
    }
  },
  deleteVanBan: (vanBanId) => {
    return {
      ok: true
    }
  },
  searchVanBans: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchVanBans.json')
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/updateUser.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/getUsers.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/getUser.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({user}) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({email}) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      data: require('../fixtures/get-account.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({currentPassword}) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
