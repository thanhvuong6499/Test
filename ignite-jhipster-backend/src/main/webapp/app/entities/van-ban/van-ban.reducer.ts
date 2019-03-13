import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IVanBan, defaultValue } from 'app/shared/model/van-ban.model';

export const ACTION_TYPES = {
  SEARCH_VANBANS: 'vanBan/SEARCH_VANBANS',
  FETCH_VANBAN_LIST: 'vanBan/FETCH_VANBAN_LIST',
  FETCH_VANBAN: 'vanBan/FETCH_VANBAN',
  CREATE_VANBAN: 'vanBan/CREATE_VANBAN',
  UPDATE_VANBAN: 'vanBan/UPDATE_VANBAN',
  DELETE_VANBAN: 'vanBan/DELETE_VANBAN',
  RESET: 'vanBan/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVanBan>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type VanBanState = Readonly<typeof initialState>;

// Reducer

export default (state: VanBanState = initialState, action): VanBanState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_VANBANS):
    case REQUEST(ACTION_TYPES.FETCH_VANBAN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VANBAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VANBAN):
    case REQUEST(ACTION_TYPES.UPDATE_VANBAN):
    case REQUEST(ACTION_TYPES.DELETE_VANBAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_VANBANS):
    case FAILURE(ACTION_TYPES.FETCH_VANBAN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VANBAN):
    case FAILURE(ACTION_TYPES.CREATE_VANBAN):
    case FAILURE(ACTION_TYPES.UPDATE_VANBAN):
    case FAILURE(ACTION_TYPES.DELETE_VANBAN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_VANBANS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VANBAN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VANBAN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VANBAN):
    case SUCCESS(ACTION_TYPES.UPDATE_VANBAN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VANBAN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/van-bans';
const apiSearchUrl = SERVER_API_URL + '/api/_search/van-bans';

// Actions

export const getSearchEntities: ICrudSearchAction<IVanBan> = query => ({
  type: ACTION_TYPES.SEARCH_VANBANS,
  payload: axios.get<IVanBan>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IVanBan> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VANBAN_LIST,
  payload: axios.get<IVanBan>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IVanBan> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VANBAN,
    payload: axios.get<IVanBan>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVanBan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VANBAN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVanBan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VANBAN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVanBan> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VANBAN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
