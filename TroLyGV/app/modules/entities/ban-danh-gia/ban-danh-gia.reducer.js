import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  banDanhGiaRequest: ['banDanhGiaId'],
  banDanhGiaAllRequest: ['options'],
  banDanhGiaUpdateRequest: ['banDanhGia'],
  banDanhGiaSearchRequest: ['query'],
  banDanhGiaDeleteRequest: ['banDanhGiaId'],

  banDanhGiaSuccess: ['banDanhGia'],
  banDanhGiaAllSuccess: ['banDanhGias'],
  banDanhGiaUpdateSuccess: ['banDanhGia'],
  banDanhGiaSearchSuccess: ['banDanhGias'],
  banDanhGiaDeleteSuccess: [],

  banDanhGiaFailure: ['error'],
  banDanhGiaAllFailure: ['error'],
  banDanhGiaUpdateFailure: ['error'],
  banDanhGiaSearchFailure: ['error'],
  banDanhGiaDeleteFailure: ['error']
})

export const BanDanhGiaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  banDanhGia: null,
  banDanhGias: null,
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
    banDanhGia: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    banDanhGias: null
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
  const { banDanhGia } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    banDanhGia
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { banDanhGias } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    banDanhGias
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { banDanhGia } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    banDanhGia
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { banDanhGias } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    banDanhGias
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    banDanhGia: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    banDanhGia: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    banDanhGias: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    banDanhGia: state.banDanhGia
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    banDanhGia: state.banDanhGia
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    banDanhGias: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BAN_DANH_GIA_REQUEST]: request,
  [Types.BAN_DANH_GIA_ALL_REQUEST]: allRequest,
  [Types.BAN_DANH_GIA_UPDATE_REQUEST]: updateRequest,
  [Types.BAN_DANH_GIA_SEARCH_REQUEST]: searchRequest,
  [Types.BAN_DANH_GIA_DELETE_REQUEST]: deleteRequest,

  [Types.BAN_DANH_GIA_SUCCESS]: success,
  [Types.BAN_DANH_GIA_ALL_SUCCESS]: allSuccess,
  [Types.BAN_DANH_GIA_UPDATE_SUCCESS]: updateSuccess,
  [Types.BAN_DANH_GIA_SEARCH_SUCCESS]: searchSuccess,
  [Types.BAN_DANH_GIA_DELETE_SUCCESS]: deleteSuccess,

  [Types.BAN_DANH_GIA_FAILURE]: failure,
  [Types.BAN_DANH_GIA_ALL_FAILURE]: allFailure,
  [Types.BAN_DANH_GIA_UPDATE_FAILURE]: updateFailure,
  [Types.BAN_DANH_GIA_SEARCH_FAILURE]: searchFailure,
  [Types.BAN_DANH_GIA_DELETE_FAILURE]: deleteFailure
})
