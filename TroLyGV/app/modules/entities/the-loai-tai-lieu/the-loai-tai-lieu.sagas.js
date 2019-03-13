import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TheLoaiTaiLieuActions from './the-loai-tai-lieu.reducer'

export function * getTheLoaiTaiLieu (api, action) {
  const { theLoaiTaiLieuId } = action
  // make the call to the api
  const apiCall = call(api.getTheLoaiTaiLieu, theLoaiTaiLieuId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuSuccess(response.data))
  } else {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuFailure(response.data))
  }
}

export function * getTheLoaiTaiLieus (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTheLoaiTaiLieus, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuAllSuccess(response.data))
  } else {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuAllFailure(response.data))
  }
}

export function * updateTheLoaiTaiLieu (api, action) {
  const { theLoaiTaiLieu } = action
  // make the call to the api
  const idIsNotNull = !!theLoaiTaiLieu.id
  const apiCall = call(idIsNotNull ? api.updateTheLoaiTaiLieu : api.createTheLoaiTaiLieu, theLoaiTaiLieu)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuUpdateSuccess(response.data))
  } else {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuUpdateFailure(response.data))
  }
}

export function * searchTheLoaiTaiLieus (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchTheLoaiTaiLieus, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuSearchSuccess(response.data))
  } else {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuSearchFailure(response.data))
  }
}
export function * deleteTheLoaiTaiLieu (api, action) {
  const { theLoaiTaiLieuId } = action
  // make the call to the api
  const apiCall = call(api.deleteTheLoaiTaiLieu, theLoaiTaiLieuId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuDeleteSuccess())
  } else {
    yield put(TheLoaiTaiLieuActions.theLoaiTaiLieuDeleteFailure(response.data))
  }
}
