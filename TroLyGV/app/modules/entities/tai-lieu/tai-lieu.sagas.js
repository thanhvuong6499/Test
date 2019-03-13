import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TaiLieuActions from './tai-lieu.reducer'

export function * getTaiLieu (api, action) {
  const { taiLieuId } = action
  // make the call to the api
  const apiCall = call(api.getTaiLieu, taiLieuId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TaiLieuActions.taiLieuSuccess(response.data))
  } else {
    yield put(TaiLieuActions.taiLieuFailure(response.data))
  }
}

export function * getTaiLieus (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTaiLieus, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TaiLieuActions.taiLieuAllSuccess(response.data))
  } else {
    yield put(TaiLieuActions.taiLieuAllFailure(response.data))
  }
}

export function * updateTaiLieu (api, action) {
  const { taiLieu } = action
  // make the call to the api
  const idIsNotNull = !!taiLieu.id
  const apiCall = call(idIsNotNull ? api.updateTaiLieu : api.createTaiLieu, taiLieu)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TaiLieuActions.taiLieuUpdateSuccess(response.data))
  } else {
    yield put(TaiLieuActions.taiLieuUpdateFailure(response.data))
  }
}

export function * searchTaiLieus (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchTaiLieus, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TaiLieuActions.taiLieuSearchSuccess(response.data))
  } else {
    yield put(TaiLieuActions.taiLieuSearchFailure(response.data))
  }
}
export function * deleteTaiLieu (api, action) {
  const { taiLieuId } = action
  // make the call to the api
  const apiCall = call(api.deleteTaiLieu, taiLieuId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TaiLieuActions.taiLieuDeleteSuccess())
  } else {
    yield put(TaiLieuActions.taiLieuDeleteFailure(response.data))
  }
}
