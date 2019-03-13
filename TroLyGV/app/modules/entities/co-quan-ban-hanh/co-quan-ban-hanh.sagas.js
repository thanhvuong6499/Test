import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CoQuanBanHanhActions from './co-quan-ban-hanh.reducer'

export function * getCoQuanBanHanh (api, action) {
  const { coQuanBanHanhId } = action
  // make the call to the api
  const apiCall = call(api.getCoQuanBanHanh, coQuanBanHanhId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CoQuanBanHanhActions.coQuanBanHanhSuccess(response.data))
  } else {
    yield put(CoQuanBanHanhActions.coQuanBanHanhFailure(response.data))
  }
}

export function * getCoQuanBanHanhs (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCoQuanBanHanhs, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CoQuanBanHanhActions.coQuanBanHanhAllSuccess(response.data))
  } else {
    yield put(CoQuanBanHanhActions.coQuanBanHanhAllFailure(response.data))
  }
}

export function * updateCoQuanBanHanh (api, action) {
  const { coQuanBanHanh } = action
  // make the call to the api
  const idIsNotNull = !!coQuanBanHanh.id
  const apiCall = call(idIsNotNull ? api.updateCoQuanBanHanh : api.createCoQuanBanHanh, coQuanBanHanh)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CoQuanBanHanhActions.coQuanBanHanhUpdateSuccess(response.data))
  } else {
    yield put(CoQuanBanHanhActions.coQuanBanHanhUpdateFailure(response.data))
  }
}

export function * searchCoQuanBanHanhs (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchCoQuanBanHanhs, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CoQuanBanHanhActions.coQuanBanHanhSearchSuccess(response.data))
  } else {
    yield put(CoQuanBanHanhActions.coQuanBanHanhSearchFailure(response.data))
  }
}
export function * deleteCoQuanBanHanh (api, action) {
  const { coQuanBanHanhId } = action
  // make the call to the api
  const apiCall = call(api.deleteCoQuanBanHanh, coQuanBanHanhId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CoQuanBanHanhActions.coQuanBanHanhDeleteSuccess())
  } else {
    yield put(CoQuanBanHanhActions.coQuanBanHanhDeleteFailure(response.data))
  }
}
