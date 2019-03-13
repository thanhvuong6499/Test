import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ITheLoaiVanBan, defaultValue } from 'app/shared/model/the-loai-van-ban.model';

export const ACTION_TYPES = {
  SEARCH_THELOAIVANBANS: 'theLoaiVanBan/SEARCH_THELOAIVANBANS',
  FETCH_THELOAIVANBAN_LIST: 'theLoaiVanBan/FETCH_THELOAIVANBAN_LIST',
  FETCH_THELOAIVANBAN: 'theLoaiVanBan/FETCH_THELOAIVANBAN',
  CREATE_THELOAIVANBAN: 'theLoaiVanBan/CREATE_THELOAIVANBAN',
  UPDATE_THELOAIVANBAN: 'theLoaiVanBan/UPDATE_THELOAIVANBAN',
  DELETE_THELOAIVANBAN: 'theLoaiVanBan/DELETE_THELOAIVANBAN',
  RESET: 'theLoaiVanBan/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITheLoaiVanBan>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TheLoaiVanBanState = Readonly<typeof initialState>;

// Reducer

export default (state: TheLoaiVanBanState = initialState, action): TheLoaiVanBanState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_THELOAIVANBANS):
    case REQUEST(ACTION_TYPES.FETCH_THELOAIVANBAN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THELOAIVANBAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_THELOAIVANBAN):
    case REQUEST(ACTION_TYPES.UPDATE_THELOAIVANBAN):
    case REQUEST(ACTION_TYPES.DELETE_THELOAIVANBAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_THELOAIVANBANS):
    case FAILURE(ACTION_TYPES.FETCH_THELOAIVANBAN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THELOAIVANBAN):
    case FAILURE(ACTION_TYPES.CREATE_THELOAIVANBAN):
    case FAILURE(ACTION_TYPES.UPDATE_THELOAIVANBAN):
    case FAILURE(ACTION_TYPES.DELETE_THELOAIVANBAN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_THELOAIVANBANS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THELOAIVANBAN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THELOAIVANBAN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_THELOAIVANBAN):
    case SUCCESS(ACTION_TYPES.UPDATE_THELOAIVANBAN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_THELOAIVANBAN):
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

const apiUrl = SERVER_API_URL + '/api/the-loai-van-bans';
const apiSearchUrl = SERVER_API_URL + '/api/_search/the-loai-van-bans';

// Actions

export const getSearchEntities: ICrudSearchAction<ITheLoaiVanBan> = query => ({
  type: ACTION_TYPES.SEARCH_THELOAIVANBANS,
  payload: axios.get<ITheLoaiVanBan>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ITheLoaiVanBan> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_THELOAIVANBAN_LIST,
  payload: axios.get<ITheLoaiVanBan>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITheLoaiVanBan> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THELOAIVANBAN,
    payload: axios.get<ITheLoaiVanBan>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITheLoaiVanBan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THELOAIVANBAN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITheLoaiVanBan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THELOAIVANBAN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITheLoaiVanBan> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_THELOAIVANBAN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
