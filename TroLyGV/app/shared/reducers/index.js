import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import configureStore from './create-store'
import rootSaga from '../sagas'
import ReduxPersist from '../../config/redux-persist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  giaoViens: require('../../modules/entities/giao-vien/giao-vien.reducer').reducer,
  taiLieus: require('../../modules/entities/tai-lieu/tai-lieu.reducer').reducer,
  banDanhGias: require('../../modules/entities/ban-danh-gia/ban-danh-gia.reducer').reducer,
  cauTraLois: require('../../modules/entities/cau-tra-loi/cau-tra-loi.reducer').reducer,
  coQuanBanHanhs: require('../../modules/entities/co-quan-ban-hanh/co-quan-ban-hanh.reducer').reducer,
  theLoaiTaiLieus: require('../../modules/entities/the-loai-tai-lieu/the-loai-tai-lieu.reducer').reducer,
  theLoaiTieuChis: require('../../modules/entities/the-loai-tieu-chi/the-loai-tieu-chi.reducer').reducer,
  theLoaiVanBans: require('../../modules/entities/the-loai-van-ban/the-loai-van-ban.reducer').reducer,
  tieuChiDanhGias: require('../../modules/entities/tieu-chi-danh-gia/tieu-chi-danh-gia.reducer').reducer,
  vanBans: require('../../modules/entities/van-ban/van-ban.reducer').reducer,
  // ignite-jhipster-redux-store-import-needle
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  register: require('../../modules/account/register/register.reducer').reducer,
  changePassword: require('../../modules/account/password/change-password.reducer').reducer,
  forgotPassword: require('../../modules/account/password-reset/forgot-password.reducer').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
