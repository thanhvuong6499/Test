import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import GiaoVienActions from './giao-vien.reducer'

export function * getGiaoVien (api, action) {
  const { giaoVienId } = action
  // make the call to the api
  const apiCall = call(api.getGiaoVien, giaoVienId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(GiaoVienActions.giaoVienSuccess(response.data))
  } else {
    yield put(GiaoVienActions.giaoVienFailure(response.data))
  }
}

export function * getGiaoViens (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getGiaoViens, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(GiaoVienActions.giaoVienAllSuccess(response.data))
  } else {
    yield put(GiaoVienActions.giaoVienAllFailure(response.data))
  }
}

export function * updateGiaoVien (api, action) {
  const { giaoVien } = action
  // make the call to the api
  const idIsNotNull = !!giaoVien.id
  const apiCall = call(idIsNotNull ? api.updateGiaoVien : api.createGiaoVien, giaoVien)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(GiaoVienActions.giaoVienUpdateSuccess(response.data))
  } else {
    yield put(GiaoVienActions.giaoVienUpdateFailure(response.data))
  }
}

export function * searchGiaoViens (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchGiaoViens, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(GiaoVienActions.giaoVienSearchSuccess(response.data))
  } else {
    yield put(GiaoVienActions.giaoVienSearchFailure(response.data))
  }
}
export function * deleteGiaoVien (api, action) {
  const { giaoVienId } = action
  // make the call to the api
  const apiCall = call(api.deleteGiaoVien, giaoVienId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(GiaoVienActions.giaoVienDeleteSuccess())
  } else {
    yield put(GiaoVienActions.giaoVienDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.ngaySinh) {
    data.ngaySinh = new Date(data.ngaySinh)
  }
  return data
}
