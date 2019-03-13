import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  theLoaiTieuChiRequest: ['theLoaiTieuChiId'],
  theLoaiTieuChiAllRequest: ['options'],
  theLoaiTieuChiUpdateRequest: ['theLoaiTieuChi'],
  theLoaiTieuChiSearchRequest: ['query'],
  theLoaiTieuChiDeleteRequest: ['theLoaiTieuChiId'],

  theLoaiTieuChiSuccess: ['theLoaiTieuChi'],
  theLoaiTieuChiAllSuccess: ['theLoaiTieuChis'],
  theLoaiTieuChiUpdateSuccess: ['theLoaiTieuChi'],
  theLoaiTieuChiSearchSuccess: ['theLoaiTieuChis'],
  theLoaiTieuChiDeleteSuccess: [],

  theLoaiTieuChiFailure: ['error'],
  theLoaiTieuChiAllFailure: ['error'],
  theLoaiTieuChiUpdateFailure: ['error'],
  theLoaiTieuChiSearchFailure: ['error'],
  theLoaiTieuChiDeleteFailure: ['error']
})

export const TheLoaiTieuChiTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  theLoaiTieuChi: null,
  theLoaiTieuChis: null,
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
    theLoaiTieuChi: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    theLoaiTieuChis: null
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
  const { theLoaiTieuChi } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    theLoaiTieuChi
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { theLoaiTieuChis } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    theLoaiTieuChis
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { theLoaiTieuChi } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    theLoaiTieuChi
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { theLoaiTieuChis } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    theLoaiTieuChis
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    theLoaiTieuChi: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    theLoaiTieuChi: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    theLoaiTieuChis: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    theLoaiTieuChi: state.theLoaiTieuChi
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    theLoaiTieuChi: state.theLoaiTieuChi
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    theLoaiTieuChis: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.THE_LOAI_TIEU_CHI_REQUEST]: request,
  [Types.THE_LOAI_TIEU_CHI_ALL_REQUEST]: allRequest,
  [Types.THE_LOAI_TIEU_CHI_UPDATE_REQUEST]: updateRequest,
  [Types.THE_LOAI_TIEU_CHI_SEARCH_REQUEST]: searchRequest,
  [Types.THE_LOAI_TIEU_CHI_DELETE_REQUEST]: deleteRequest,

  [Types.THE_LOAI_TIEU_CHI_SUCCESS]: success,
  [Types.THE_LOAI_TIEU_CHI_ALL_SUCCESS]: allSuccess,
  [Types.THE_LOAI_TIEU_CHI_UPDATE_SUCCESS]: updateSuccess,
  [Types.THE_LOAI_TIEU_CHI_SEARCH_SUCCESS]: searchSuccess,
  [Types.THE_LOAI_TIEU_CHI_DELETE_SUCCESS]: deleteSuccess,

  [Types.THE_LOAI_TIEU_CHI_FAILURE]: failure,
  [Types.THE_LOAI_TIEU_CHI_ALL_FAILURE]: allFailure,
  [Types.THE_LOAI_TIEU_CHI_UPDATE_FAILURE]: updateFailure,
  [Types.THE_LOAI_TIEU_CHI_SEARCH_FAILURE]: searchFailure,
  [Types.THE_LOAI_TIEU_CHI_DELETE_FAILURE]: deleteFailure
})
