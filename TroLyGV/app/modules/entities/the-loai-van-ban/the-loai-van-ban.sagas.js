import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TheLoaiVanBanActions from './the-loai-van-ban.reducer'

export function * getTheLoaiVanBan (api, action) {
  const { theLoaiVanBanId } = action
  // make the call to the api
  const apiCall = call(api.getTheLoaiVanBan, theLoaiVanBanId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiVanBanActions.theLoaiVanBanSuccess(response.data))
  } else {
    yield put(TheLoaiVanBanActions.theLoaiVanBanFailure(response.data))
  }
}

export function * getTheLoaiVanBans (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTheLoaiVanBans, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiVanBanActions.theLoaiVanBanAllSuccess(response.data))
  } else {
    yield put(TheLoaiVanBanActions.theLoaiVanBanAllFailure(response.data))
  }
}

export function * updateTheLoaiVanBan (api, action) {
  const { theLoaiVanBan } = action
  // make the call to the api
  const idIsNotNull = !!theLoaiVanBan.id
  const apiCall = call(idIsNotNull ? api.updateTheLoaiVanBan : api.createTheLoaiVanBan, theLoaiVanBan)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiVanBanActions.theLoaiVanBanUpdateSuccess(response.data))
  } else {
    yield put(TheLoaiVanBanActions.theLoaiVanBanUpdateFailure(response.data))
  }
}

export function * searchTheLoaiVanBans (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchTheLoaiVanBans, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiVanBanActions.theLoaiVanBanSearchSuccess(response.data))
  } else {
    yield put(TheLoaiVanBanActions.theLoaiVanBanSearchFailure(response.data))
  }
}
export function * deleteTheLoaiVanBan (api, action) {
  const { theLoaiVanBanId } = action
  // make the call to the api
  const apiCall = call(api.deleteTheLoaiVanBan, theLoaiVanBanId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TheLoaiVanBanActions.theLoaiVanBanDeleteSuccess())
  } else {
    yield put(TheLoaiVanBanActions.theLoaiVanBanDeleteFailure(response.data))
  }
}
