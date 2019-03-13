import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  vanBanRequest: ['vanBanId'],
  vanBanAllRequest: ['options'],
  vanBanUpdateRequest: ['vanBan'],
  vanBanSearchRequest: ['query'],
  vanBanDeleteRequest: ['vanBanId'],

  vanBanSuccess: ['vanBan'],
  vanBanAllSuccess: ['vanBans'],
  vanBanUpdateSuccess: ['vanBan'],
  vanBanSearchSuccess: ['vanBans'],
  vanBanDeleteSuccess: [],

  vanBanFailure: ['error'],
  vanBanAllFailure: ['error'],
  vanBanUpdateFailure: ['error'],
  vanBanSearchFailure: ['error'],
  vanBanDeleteFailure: ['error']
})

export const VanBanTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  vanBan: null,
  vanBans: null,
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
    vanBan: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    vanBans: null
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
  const { vanBan } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    vanBan
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { vanBans } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    vanBans
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { vanBan } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    vanBan
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { vanBans } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    vanBans
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    vanBan: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    vanBan: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    vanBans: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    vanBan: state.vanBan
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    vanBan: state.vanBan
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    vanBans: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VAN_BAN_REQUEST]: request,
  [Types.VAN_BAN_ALL_REQUEST]: allRequest,
  [Types.VAN_BAN_UPDATE_REQUEST]: updateRequest,
  [Types.VAN_BAN_SEARCH_REQUEST]: searchRequest,
  [Types.VAN_BAN_DELETE_REQUEST]: deleteRequest,

  [Types.VAN_BAN_SUCCESS]: success,
  [Types.VAN_BAN_ALL_SUCCESS]: allSuccess,
  [Types.VAN_BAN_UPDATE_SUCCESS]: updateSuccess,
  [Types.VAN_BAN_SEARCH_SUCCESS]: searchSuccess,
  [Types.VAN_BAN_DELETE_SUCCESS]: deleteSuccess,

  [Types.VAN_BAN_FAILURE]: failure,
  [Types.VAN_BAN_ALL_FAILURE]: allFailure,
  [Types.VAN_BAN_UPDATE_FAILURE]: updateFailure,
  [Types.VAN_BAN_SEARCH_FAILURE]: searchFailure,
  [Types.VAN_BAN_DELETE_FAILURE]: deleteFailure
})
