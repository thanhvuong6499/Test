import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TheLoaiTieuChiActions from './the-loai-tieu-chi.reducer'

export function * getTheLoaiTieuChi (api, action) {
  const { theLoaiTieuChiId } = action
  // make the call to the api
  const apiCall = call(api.getTheLoaiTieuChi, theLoaiTieuChiId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiSuccess(response.data))
  } else {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiFailure(response.data))
  }
}

export function * getTheLoaiTieuChis (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTheLoaiTieuChis, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiAllSuccess(response.data))
  } else {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiAllFailure(response.data))
  }
}

export function * updateTheLoaiTieuChi (api, action) {
  const { theLoaiTieuChi } = action
  // make the call to the api
  const idIsNotNull = !!theLoaiTieuChi.id
  const apiCall = call(idIsNotNull ? api.updateTheLoaiTieuChi : api.createTheLoaiTieuChi, theLoaiTieuChi)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiUpdateSuccess(response.data))
  } else {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiUpdateFailure(response.data))
  }
}

export function * searchTheLoaiTieuChis (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchTheLoaiTieuChis, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiSearchSuccess(response.data))
  } else {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiSearchFailure(response.data))
  }
}
export function * deleteTheLoaiTieuChi (api, action) {
  const { theLoaiTieuChiId } = action
  // make the call to the api
  const apiCall = call(api.deleteTheLoaiTieuChi, theLoaiTieuChiId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiDeleteSuccess())
  } else {
    yield put(TheLoaiTieuChiActions.theLoaiTieuChiDeleteFailure(response.data))
  }
}
