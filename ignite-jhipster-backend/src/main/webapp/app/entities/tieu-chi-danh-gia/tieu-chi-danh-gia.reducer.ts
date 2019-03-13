import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ITieuChiDanhGia, defaultValue } from 'app/shared/model/tieu-chi-danh-gia.model';

export const ACTION_TYPES = {
  SEARCH_TIEUCHIDANHGIAS: 'tieuChiDanhGia/SEARCH_TIEUCHIDANHGIAS',
  FETCH_TIEUCHIDANHGIA_LIST: 'tieuChiDanhGia/FETCH_TIEUCHIDANHGIA_LIST',
  FETCH_TIEUCHIDANHGIA: 'tieuChiDanhGia/FETCH_TIEUCHIDANHGIA',
  CREATE_TIEUCHIDANHGIA: 'tieuChiDanhGia/CREATE_TIEUCHIDANHGIA',
  UPDATE_TIEUCHIDANHGIA: 'tieuChiDanhGia/UPDATE_TIEUCHIDANHGIA',
  DELETE_TIEUCHIDANHGIA: 'tieuChiDanhGia/DELETE_TIEUCHIDANHGIA',
  RESET: 'tieuChiDanhGia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITieuChiDanhGia>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TieuChiDanhGiaState = Readonly<typeof initialState>;

// Reducer

export default (state: TieuChiDanhGiaState = initialState, action): TieuChiDanhGiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_TIEUCHIDANHGIAS):
    case REQUEST(ACTION_TYPES.FETCH_TIEUCHIDANHGIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIEUCHIDANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIEUCHIDANHGIA):
    case REQUEST(ACTION_TYPES.UPDATE_TIEUCHIDANHGIA):
    case REQUEST(ACTION_TYPES.DELETE_TIEUCHIDANHGIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_TIEUCHIDANHGIAS):
    case FAILURE(ACTION_TYPES.FETCH_TIEUCHIDANHGIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIEUCHIDANHGIA):
    case FAILURE(ACTION_TYPES.CREATE_TIEUCHIDANHGIA):
    case FAILURE(ACTION_TYPES.UPDATE_TIEUCHIDANHGIA):
    case FAILURE(ACTION_TYPES.DELETE_TIEUCHIDANHGIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_TIEUCHIDANHGIAS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIEUCHIDANHGIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIEUCHIDANHGIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIEUCHIDANHGIA):
    case SUCCESS(ACTION_TYPES.UPDATE_TIEUCHIDANHGIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIEUCHIDANHGIA):
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

const apiUrl = SERVER_API_URL + '/api/tieu-chi-danh-gias';
const apiSearchUrl = SERVER_API_URL + '/api/_search/tieu-chi-danh-gias';

// Actions

export const getSearchEntities: ICrudSearchAction<ITieuChiDanhGia> = query => ({
  type: ACTION_TYPES.SEARCH_TIEUCHIDANHGIAS,
  payload: axios.get<ITieuChiDanhGia>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ITieuChiDanhGia> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TIEUCHIDANHGIA_LIST,
  payload: axios.get<ITieuChiDanhGia>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITieuChiDanhGia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIEUCHIDANHGIA,
    payload: axios.get<ITieuChiDanhGia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITieuChiDanhGia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIEUCHIDANHGIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITieuChiDanhGia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIEUCHIDANHGIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITieuChiDanhGia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIEUCHIDANHGIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
