import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tieuChiDanhGiaRequest: ['tieuChiDanhGiaId'],
  tieuChiDanhGiaAllRequest: ['options'],
  tieuChiDanhGiaUpdateRequest: ['tieuChiDanhGia'],
  tieuChiDanhGiaSearchRequest: ['query'],
  tieuChiDanhGiaDeleteRequest: ['tieuChiDanhGiaId'],

  tieuChiDanhGiaSuccess: ['tieuChiDanhGia'],
  tieuChiDanhGiaAllSuccess: ['tieuChiDanhGias'],
  tieuChiDanhGiaUpdateSuccess: ['tieuChiDanhGia'],
  tieuChiDanhGiaSearchSuccess: ['tieuChiDanhGias'],
  tieuChiDanhGiaDeleteSuccess: [],

  tieuChiDanhGiaFailure: ['error'],
  tieuChiDanhGiaAllFailure: ['error'],
  tieuChiDanhGiaUpdateFailure: ['error'],
  tieuChiDanhGiaSearchFailure: ['error'],
  tieuChiDanhGiaDeleteFailure: ['error']
})

export const TieuChiDanhGiaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  tieuChiDanhGia: null,
  tieuChiDanhGias: null,
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
    tieuChiDanhGia: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    tieuChiDanhGias: null
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
  const { tieuChiDanhGia } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    tieuChiDanhGia
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { tieuChiDanhGias } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    tieuChiDanhGias
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { tieuChiDanhGia } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    tieuChiDanhGia
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { tieuChiDanhGias } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    tieuChiDanhGias
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    tieuChiDanhGia: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    tieuChiDanhGia: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    tieuChiDanhGias: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    tieuChiDanhGia: state.tieuChiDanhGia
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    tieuChiDanhGia: state.tieuChiDanhGia
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    tieuChiDanhGias: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TIEU_CHI_DANH_GIA_REQUEST]: request,
  [Types.TIEU_CHI_DANH_GIA_ALL_REQUEST]: allRequest,
  [Types.TIEU_CHI_DANH_GIA_UPDATE_REQUEST]: updateRequest,
  [Types.TIEU_CHI_DANH_GIA_SEARCH_REQUEST]: searchRequest,
  [Types.TIEU_CHI_DANH_GIA_DELETE_REQUEST]: deleteRequest,

  [Types.TIEU_CHI_DANH_GIA_SUCCESS]: success,
  [Types.TIEU_CHI_DANH_GIA_ALL_SUCCESS]: allSuccess,
  [Types.TIEU_CHI_DANH_GIA_UPDATE_SUCCESS]: updateSuccess,
  [Types.TIEU_CHI_DANH_GIA_SEARCH_SUCCESS]: searchSuccess,
  [Types.TIEU_CHI_DANH_GIA_DELETE_SUCCESS]: deleteSuccess,

  [Types.TIEU_CHI_DANH_GIA_FAILURE]: failure,
  [Types.TIEU_CHI_DANH_GIA_ALL_FAILURE]: allFailure,
  [Types.TIEU_CHI_DANH_GIA_UPDATE_FAILURE]: updateFailure,
  [Types.TIEU_CHI_DANH_GIA_SEARCH_FAILURE]: searchFailure,
  [Types.TIEU_CHI_DANH_GIA_DELETE_FAILURE]: deleteFailure
})
