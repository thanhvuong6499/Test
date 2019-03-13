import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  theLoaiTaiLieuRequest: ['theLoaiTaiLieuId'],
  theLoaiTaiLieuAllRequest: ['options'],
  theLoaiTaiLieuUpdateRequest: ['theLoaiTaiLieu'],
  theLoaiTaiLieuSearchRequest: ['query'],
  theLoaiTaiLieuDeleteRequest: ['theLoaiTaiLieuId'],

  theLoaiTaiLieuSuccess: ['theLoaiTaiLieu'],
  theLoaiTaiLieuAllSuccess: ['theLoaiTaiLieus'],
  theLoaiTaiLieuUpdateSuccess: ['theLoaiTaiLieu'],
  theLoaiTaiLieuSearchSuccess: ['theLoaiTaiLieus'],
  theLoaiTaiLieuDeleteSuccess: [],

  theLoaiTaiLieuFailure: ['error'],
  theLoaiTaiLieuAllFailure: ['error'],
  theLoaiTaiLieuUpdateFailure: ['error'],
  theLoaiTaiLieuSearchFailure: ['error'],
  theLoaiTaiLieuDeleteFailure: ['error']
})

export const TheLoaiTaiLieuTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  theLoaiTaiLieu: null,
  theLoaiTaiLieus: null,
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
    theLoaiTaiLieu: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    theLoaiTaiLieus: null
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
  const { theLoaiTaiLieu } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    theLoaiTaiLieu
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { theLoaiTaiLieus } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    theLoaiTaiLieus
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { theLoaiTaiLieu } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    theLoaiTaiLieu
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { theLoaiTaiLieus } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    theLoaiTaiLieus
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    theLoaiTaiLieu: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    theLoaiTaiLieu: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    theLoaiTaiLieus: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    theLoaiTaiLieu: state.theLoaiTaiLieu
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    theLoaiTaiLieu: state.theLoaiTaiLieu
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    theLoaiTaiLieus: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.THE_LOAI_TAI_LIEU_REQUEST]: request,
  [Types.THE_LOAI_TAI_LIEU_ALL_REQUEST]: allRequest,
  [Types.THE_LOAI_TAI_LIEU_UPDATE_REQUEST]: updateRequest,
  [Types.THE_LOAI_TAI_LIEU_SEARCH_REQUEST]: searchRequest,
  [Types.THE_LOAI_TAI_LIEU_DELETE_REQUEST]: deleteRequest,

  [Types.THE_LOAI_TAI_LIEU_SUCCESS]: success,
  [Types.THE_LOAI_TAI_LIEU_ALL_SUCCESS]: allSuccess,
  [Types.THE_LOAI_TAI_LIEU_UPDATE_SUCCESS]: updateSuccess,
  [Types.THE_LOAI_TAI_LIEU_SEARCH_SUCCESS]: searchSuccess,
  [Types.THE_LOAI_TAI_LIEU_DELETE_SUCCESS]: deleteSuccess,

  [Types.THE_LOAI_TAI_LIEU_FAILURE]: failure,
  [Types.THE_LOAI_TAI_LIEU_ALL_FAILURE]: allFailure,
  [Types.THE_LOAI_TAI_LIEU_UPDATE_FAILURE]: updateFailure,
  [Types.THE_LOAI_TAI_LIEU_SEARCH_FAILURE]: searchFailure,
  [Types.THE_LOAI_TAI_LIEU_DELETE_FAILURE]: deleteFailure
})
