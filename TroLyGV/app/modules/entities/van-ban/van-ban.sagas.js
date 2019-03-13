import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import VanBanActions from './van-ban.reducer'

export function * getVanBan (api, action) {
  const { vanBanId } = action
  // make the call to the api
  const apiCall = call(api.getVanBan, vanBanId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VanBanActions.vanBanSuccess(response.data))
  } else {
    yield put(VanBanActions.vanBanFailure(response.data))
  }
}

export function * getVanBans (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getVanBans, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VanBanActions.vanBanAllSuccess(response.data))
  } else {
    yield put(VanBanActions.vanBanAllFailure(response.data))
  }
}

export function * updateVanBan (api, action) {
  const { vanBan } = action
  // make the call to the api
  const idIsNotNull = !!vanBan.id
  const apiCall = call(idIsNotNull ? api.updateVanBan : api.createVanBan, vanBan)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VanBanActions.vanBanUpdateSuccess(response.data))
  } else {
    yield put(VanBanActions.vanBanUpdateFailure(response.data))
  }
}

export function * searchVanBans (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchVanBans, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VanBanActions.vanBanSearchSuccess(response.data))
  } else {
    yield put(VanBanActions.vanBanSearchFailure(response.data))
  }
}
export function * deleteVanBan (api, action) {
  const { vanBanId } = action
  // make the call to the api
  const apiCall = call(api.deleteVanBan, vanBanId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VanBanActions.vanBanDeleteSuccess())
  } else {
    yield put(VanBanActions.vanBanDeleteFailure(response.data))
  }
}
