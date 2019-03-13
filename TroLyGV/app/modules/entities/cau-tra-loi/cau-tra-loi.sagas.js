import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CauTraLoiActions from './cau-tra-loi.reducer'

export function * getCauTraLoi (api, action) {
  const { cauTraLoiId } = action
  // make the call to the api
  const apiCall = call(api.getCauTraLoi, cauTraLoiId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CauTraLoiActions.cauTraLoiSuccess(response.data))
  } else {
    yield put(CauTraLoiActions.cauTraLoiFailure(response.data))
  }
}

export function * getCauTraLois (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCauTraLois, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CauTraLoiActions.cauTraLoiAllSuccess(response.data))
  } else {
    yield put(CauTraLoiActions.cauTraLoiAllFailure(response.data))
  }
}

export function * updateCauTraLoi (api, action) {
  const { cauTraLoi } = action
  // make the call to the api
  const idIsNotNull = !!cauTraLoi.id
  const apiCall = call(idIsNotNull ? api.updateCauTraLoi : api.createCauTraLoi, cauTraLoi)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CauTraLoiActions.cauTraLoiUpdateSuccess(response.data))
  } else {
    yield put(CauTraLoiActions.cauTraLoiUpdateFailure(response.data))
  }
}

export function * searchCauTraLois (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchCauTraLois, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CauTraLoiActions.cauTraLoiSearchSuccess(response.data))
  } else {
    yield put(CauTraLoiActions.cauTraLoiSearchFailure(response.data))
  }
}
export function * deleteCauTraLoi (api, action) {
  const { cauTraLoiId } = action
  // make the call to the api
  const apiCall = call(api.deleteCauTraLoi, cauTraLoiId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CauTraLoiActions.cauTraLoiDeleteSuccess())
  } else {
    yield put(CauTraLoiActions.cauTraLoiDeleteFailure(response.data))
  }
}
