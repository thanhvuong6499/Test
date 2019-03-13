import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IBanDanhGia, defaultValue } from 'app/shared/model/ban-danh-gia.model';

export const ACTION_TYPES = {
  SEARCH_BANDANHGIAS: 'banDanhGia/SEARCH_BANDANHGIAS',
  FETCH_BANDANHGIA_LIST: 'banDanhGia/FETCH_BANDANHGIA_LIST',
  FETCH_BANDANHGIA: 'banDanhGia/FETCH_BANDANHGIA',
  CREATE_BANDANHGIA: 'banDanhGia/CREATE_BANDANHGIA',
  UPDATE_BANDANHGIA: 'banDanhGia/UPDATE_BANDANHGIA',
  DELETE_BANDANHGIA: 'banDanhGia/DELETE_BANDANHGIA',
  RESET: 'banDanhGia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBanDanhGia>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BanDanhGiaState = Readonly<typeof initialState>;

// Reducer

export default (state: BanDanhGiaState = initialState, action): BanDanhGiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_BANDANHGIAS):
    case REQUEST(ACTION_TYPES.FETCH_BANDANHGIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BANDANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BANDANHGIA):
    case REQUEST(ACTION_TYPES.UPDATE_BANDANHGIA):
    case REQUEST(ACTION_TYPES.DELETE_BANDANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_BANDANHGIAS):
    case FAILURE(ACTION_TYPES.FETCH_BANDANHGIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BANDANHGIA):
    case FAILURE(ACTION_TYPES.CREATE_BANDANHGIA):
    case FAILURE(ACTION_TYPES.UPDATE_BANDANHGIA):
    case FAILURE(ACTION_TYPES.DELETE_BANDANHGIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_BANDANHGIAS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANDANHGIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANDANHGIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BANDANHGIA):
    case SUCCESS(ACTION_TYPES.UPDATE_BANDANHGIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BANDANHGIA):
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

const apiUrl = SERVER_API_URL + '/api/ban-danh-gias';
const apiSearchUrl = SERVER_API_URL + '/api/_search/ban-danh-gias';

// Actions

export const getSearchEntities: ICrudSearchAction<IBanDanhGia> = query => ({
  type: ACTION_TYPES.SEARCH_BANDANHGIAS,
  payload: axios.get<IBanDanhGia>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IBanDanhGia> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BANDANHGIA_LIST,
  payload: axios.get<IBanDanhGia>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBanDanhGia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BANDANHGIA,
    payload: axios.get<IBanDanhGia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBanDanhGia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BANDANHGIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBanDanhGia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BANDANHGIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBanDanhGia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BANDANHGIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
