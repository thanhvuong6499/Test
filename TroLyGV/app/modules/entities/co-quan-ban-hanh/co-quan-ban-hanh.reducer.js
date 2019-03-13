import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  coQuanBanHanhRequest: ['coQuanBanHanhId'],
  coQuanBanHanhAllRequest: ['options'],
  coQuanBanHanhUpdateRequest: ['coQuanBanHanh'],
  coQuanBanHanhSearchRequest: ['query'],
  coQuanBanHanhDeleteRequest: ['coQuanBanHanhId'],

  coQuanBanHanhSuccess: ['coQuanBanHanh'],
  coQuanBanHanhAllSuccess: ['coQuanBanHanhs'],
  coQuanBanHanhUpdateSuccess: ['coQuanBanHanh'],
  coQuanBanHanhSearchSuccess: ['coQuanBanHanhs'],
  coQuanBanHanhDeleteSuccess: [],

  coQuanBanHanhFailure: ['error'],
  coQuanBanHanhAllFailure: ['error'],
  coQuanBanHanhUpdateFailure: ['error'],
  coQuanBanHanhSearchFailure: ['error'],
  coQuanBanHanhDeleteFailure: ['error']
})

export const CoQuanBanHanhTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  coQuanBanHanh: null,
  coQuanBanHanhs: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    coQuanBanHanh: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    coQuanBanHanhs: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to search from an api
export const searchRequest = (state) =>
  state.merge({
    searching: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { coQuanBanHanh } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    coQuanBanHanh
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { coQuanBanHanhs } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    coQuanBanHanhs
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { coQuanBanHanh } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    coQuanBanHanh
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { coQuanBanHanhs } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    coQuanBanHanhs
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    coQuanBanHanh: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    coQuanBanHanh: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    coQuanBanHanhs: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    coQuanBanHanh: state.coQuanBanHanh
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    coQuanBanHanh: state.coQuanBanHanh
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    coQuanBanHanhs: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CO_QUAN_BAN_HANH_REQUEST]: request,
  [Types.CO_QUAN_BAN_HANH_ALL_REQUEST]: allRequest,
  [Types.CO_QUAN_BAN_HANH_UPDATE_REQUEST]: updateRequest,
  [Types.CO_QUAN_BAN_HANH_SEARCH_REQUEST]: searchRequest,
  [Types.CO_QUAN_BAN_HANH_DELETE_REQUEST]: deleteRequest,

  [Types.CO_QUAN_BAN_HANH_SUCCESS]: success,
  [Types.CO_QUAN_BAN_HANH_ALL_SUCCESS]: allSuccess,
  [Types.CO_QUAN_BAN_HANH_UPDATE_SUCCESS]: updateSuccess,
  [Types.CO_QUAN_BAN_HANH_SEARCH_SUCCESS]: searchSuccess,
  [Types.CO_QUAN_BAN_HANH_DELETE_SUCCESS]: deleteSuccess,

  [Types.CO_QUAN_BAN_HANH_FAILURE]: failure,
  [Types.CO_QUAN_BAN_HANH_ALL_FAILURE]: allFailure,
  [Types.CO_QUAN_BAN_HANH_UPDATE_FAILURE]: updateFailure,
  [Types.CO_QUAN_BAN_HANH_SEARCH_FAILURE]: searchFailure,
  [Types.CO_QUAN_BAN_HANH_DELETE_FAILURE]: deleteFailure
})
