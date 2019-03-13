import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import BanDanhGiaActions from './ban-danh-gia.reducer'

export function * getBanDanhGia (api, action) {
  const { banDanhGiaId } = action
  // make the call to the api
  const apiCall = call(api.getBanDanhGia, banDanhGiaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BanDanhGiaActions.banDanhGiaSuccess(response.data))
  } else {
    yield put(BanDanhGiaActions.banDanhGiaFailure(response.data))
  }
}

export function * getBanDanhGias (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getBanDanhGias, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BanDanhGiaActions.banDanhGiaAllSuccess(response.data))
  } else {
    yield put(BanDanhGiaActions.banDanhGiaAllFailure(response.data))
  }
}

export function * updateBanDanhGia (api, action) {
  const { banDanhGia } = action
  // make the call to the api
  const idIsNotNull = !!banDanhGia.id
  const apiCall = call(idIsNotNull ? api.updateBanDanhGia : api.createBanDanhGia, banDanhGia)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BanDanhGiaActions.banDanhGiaUpdateSuccess(response.data))
  } else {
    yield put(BanDanhGiaActions.banDanhGiaUpdateFailure(response.data))
  }
}

export function * searchBanDanhGias (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchBanDanhGias, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BanDanhGiaActions.banDanhGiaSearchSuccess(response.data))
  } else {
    yield put(BanDanhGiaActions.banDanhGiaSearchFailure(response.data))
  }
}
export function * deleteBanDanhGia (api, action) {
  const { banDanhGiaId } = action
  // make the call to the api
  const apiCall = call(api.deleteBanDanhGia, banDanhGiaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BanDanhGiaActions.banDanhGiaDeleteSuccess())
  } else {
    yield put(BanDanhGiaActions.banDanhGiaDeleteFailure(response.data))
  }
}
