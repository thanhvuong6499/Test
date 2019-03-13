import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TieuChiDanhGiaActions from './tieu-chi-danh-gia.reducer'

export function * getTieuChiDanhGia (api, action) {
  const { tieuChiDanhGiaId } = action
  // make the call to the api
  const apiCall = call(api.getTieuChiDanhGia, tieuChiDanhGiaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaSuccess(response.data))
  } else {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaFailure(response.data))
  }
}

export function * getTieuChiDanhGias (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTieuChiDanhGias, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaAllSuccess(response.data))
  } else {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaAllFailure(response.data))
  }
}

export function * updateTieuChiDanhGia (api, action) {
  const { tieuChiDanhGia } = action
  // make the call to the api
  const idIsNotNull = !!tieuChiDanhGia.id
  const apiCall = call(idIsNotNull ? api.updateTieuChiDanhGia : api.createTieuChiDanhGia, tieuChiDanhGia)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaUpdateSuccess(response.data))
  } else {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaUpdateFailure(response.data))
  }
}

export function * searchTieuChiDanhGias (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchTieuChiDanhGias, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaSearchSuccess(response.data))
  } else {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaSearchFailure(response.data))
  }
}
export function * deleteTieuChiDanhGia (api, action) {
  const { tieuChiDanhGiaId } = action
  // make the call to the api
  const apiCall = call(api.deleteTieuChiDanhGia, tieuChiDanhGiaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaDeleteSuccess())
  } else {
    yield put(TieuChiDanhGiaActions.tieuChiDanhGiaDeleteFailure(response.data))
  }
}
