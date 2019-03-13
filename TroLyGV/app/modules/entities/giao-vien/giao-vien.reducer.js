import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  giaoVienRequest: ['giaoVienId'],
  giaoVienAllRequest: ['options'],
  giaoVienUpdateRequest: ['giaoVien'],
  giaoVienSearchRequest: ['query'],
  giaoVienDeleteRequest: ['giaoVienId'],

  giaoVienSuccess: ['giaoVien'],
  giaoVienAllSuccess: ['giaoViens'],
  giaoVienUpdateSuccess: ['giaoVien'],
  giaoVienSearchSuccess: ['giaoViens'],
  giaoVienDeleteSuccess: [],

  giaoVienFailure: ['error'],
  giaoVienAllFailure: ['error'],
  giaoVienUpdateFailure: ['error'],
  giaoVienSearchFailure: ['error'],
  giaoVienDeleteFailure: ['error']
})

export const GiaoVienTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  giaoVien: null,
  giaoViens: null,
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
    giaoVien: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    giaoViens: null
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
  const { giaoVien } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    giaoVien
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { giaoViens } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    giaoViens
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { giaoVien } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    giaoVien
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { giaoViens } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    giaoViens
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    giaoVien: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    giaoVien: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    giaoViens: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    giaoVien: state.giaoVien
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    giaoVien: state.giaoVien
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    giaoViens: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GIAO_VIEN_REQUEST]: request,
  [Types.GIAO_VIEN_ALL_REQUEST]: allRequest,
  [Types.GIAO_VIEN_UPDATE_REQUEST]: updateRequest,
  [Types.GIAO_VIEN_SEARCH_REQUEST]: searchRequest,
  [Types.GIAO_VIEN_DELETE_REQUEST]: deleteRequest,

  [Types.GIAO_VIEN_SUCCESS]: success,
  [Types.GIAO_VIEN_ALL_SUCCESS]: allSuccess,
  [Types.GIAO_VIEN_UPDATE_SUCCESS]: updateSuccess,
  [Types.GIAO_VIEN_SEARCH_SUCCESS]: searchSuccess,
  [Types.GIAO_VIEN_DELETE_SUCCESS]: deleteSuccess,

  [Types.GIAO_VIEN_FAILURE]: failure,
  [Types.GIAO_VIEN_ALL_FAILURE]: allFailure,
  [Types.GIAO_VIEN_UPDATE_FAILURE]: updateFailure,
  [Types.GIAO_VIEN_SEARCH_FAILURE]: searchFailure,
  [Types.GIAO_VIEN_DELETE_FAILURE]: deleteFailure
})
