import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  theLoaiVanBanRequest: ['theLoaiVanBanId'],
  theLoaiVanBanAllRequest: ['options'],
  theLoaiVanBanUpdateRequest: ['theLoaiVanBan'],
  theLoaiVanBanSearchRequest: ['query'],
  theLoaiVanBanDeleteRequest: ['theLoaiVanBanId'],

  theLoaiVanBanSuccess: ['theLoaiVanBan'],
  theLoaiVanBanAllSuccess: ['theLoaiVanBans'],
  theLoaiVanBanUpdateSuccess: ['theLoaiVanBan'],
  theLoaiVanBanSearchSuccess: ['theLoaiVanBans'],
  theLoaiVanBanDeleteSuccess: [],

  theLoaiVanBanFailure: ['error'],
  theLoaiVanBanAllFailure: ['error'],
  theLoaiVanBanUpdateFailure: ['error'],
  theLoaiVanBanSearchFailure: ['error'],
  theLoaiVanBanDeleteFailure: ['error']
})

export const TheLoaiVanBanTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  theLoaiVanBan: null,
  theLoaiVanBans: null,
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
    theLoaiVanBan: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    theLoaiVanBans: null
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
  const { theLoaiVanBan } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    theLoaiVanBan
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { theLoaiVanBans } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    theLoaiVanBans
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { theLoaiVanBan } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    theLoaiVanBan
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { theLoaiVanBans } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    theLoaiVanBans
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    theLoaiVanBan: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    theLoaiVanBan: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    theLoaiVanBans: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    theLoaiVanBan: state.theLoaiVanBan
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    theLoaiVanBan: state.theLoaiVanBan
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    theLoaiVanBans: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.THE_LOAI_VAN_BAN_REQUEST]: request,
  [Types.THE_LOAI_VAN_BAN_ALL_REQUEST]: allRequest,
  [Types.THE_LOAI_VAN_BAN_UPDATE_REQUEST]: updateRequest,
  [Types.THE_LOAI_VAN_BAN_SEARCH_REQUEST]: searchRequest,
  [Types.THE_LOAI_VAN_BAN_DELETE_REQUEST]: deleteRequest,

  [Types.THE_LOAI_VAN_BAN_SUCCESS]: success,
  [Types.THE_LOAI_VAN_BAN_ALL_SUCCESS]: allSuccess,
  [Types.THE_LOAI_VAN_BAN_UPDATE_SUCCESS]: updateSuccess,
  [Types.THE_LOAI_VAN_BAN_SEARCH_SUCCESS]: searchSuccess,
  [Types.THE_LOAI_VAN_BAN_DELETE_SUCCESS]: deleteSuccess,

  [Types.THE_LOAI_VAN_BAN_FAILURE]: failure,
  [Types.THE_LOAI_VAN_BAN_ALL_FAILURE]: allFailure,
  [Types.THE_LOAI_VAN_BAN_UPDATE_FAILURE]: updateFailure,
  [Types.THE_LOAI_VAN_BAN_SEARCH_FAILURE]: searchFailure,
  [Types.THE_LOAI_VAN_BAN_DELETE_FAILURE]: deleteFailure
})
