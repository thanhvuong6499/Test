import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ITheLoaiTieuChi, defaultValue } from 'app/shared/model/the-loai-tieu-chi.model';

export const ACTION_TYPES = {
  SEARCH_THELOAITIEUCHIS: 'theLoaiTieuChi/SEARCH_THELOAITIEUCHIS',
  FETCH_THELOAITIEUCHI_LIST: 'theLoaiTieuChi/FETCH_THELOAITIEUCHI_LIST',
  FETCH_THELOAITIEUCHI: 'theLoaiTieuChi/FETCH_THELOAITIEUCHI',
  CREATE_THELOAITIEUCHI: 'theLoaiTieuChi/CREATE_THELOAITIEUCHI',
  UPDATE_THELOAITIEUCHI: 'theLoaiTieuChi/UPDATE_THELOAITIEUCHI',
  DELETE_THELOAITIEUCHI: 'theLoaiTieuChi/DELETE_THELOAITIEUCHI',
  RESET: 'theLoaiTieuChi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITheLoaiTieuChi>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TheLoaiTieuChiState = Readonly<typeof initialState>;

// Reducer

export default (state: TheLoaiTieuChiState = initialState, action): TheLoaiTieuChiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_THELOAITIEUCHIS):
    case REQUEST(ACTION_TYPES.FETCH_THELOAITIEUCHI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THELOAITIEUCHI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_THELOAITIEUCHI):
    case REQUEST(ACTION_TYPES.UPDATE_THELOAITIEUCHI):
    case REQUEST(ACTION_TYPES.DELETE_THELOAITIEUCHI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_THELOAITIEUCHIS):
    case FAILURE(ACTION_TYPES.FETCH_THELOAITIEUCHI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THELOAITIEUCHI):
    case FAILURE(ACTION_TYPES.CREATE_THELOAITIEUCHI):
    case FAILURE(ACTION_TYPES.UPDATE_THELOAITIEUCHI):
    case FAILURE(ACTION_TYPES.DELETE_THELOAITIEUCHI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_THELOAITIEUCHIS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THELOAITIEUCHI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THELOAITIEUCHI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_THELOAITIEUCHI):
    case SUCCESS(ACTION_TYPES.UPDATE_THELOAITIEUCHI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_THELOAITIEUCHI):
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

const apiUrl = SERVER_API_URL + '/api/the-loai-tieu-chis';
const apiSearchUrl = SERVER_API_URL + '/api/_search/the-loai-tieu-chis';

// Actions

export const getSearchEntities: ICrudSearchAction<ITheLoaiTieuChi> = query => ({
  type: ACTION_TYPES.SEARCH_THELOAITIEUCHIS,
  payload: axios.get<ITheLoaiTieuChi>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ITheLoaiTieuChi> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_THELOAITIEUCHI_LIST,
  payload: axios.get<ITheLoaiTieuChi>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITheLoaiTieuChi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THELOAITIEUCHI,
    payload: axios.get<ITheLoaiTieuChi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITheLoaiTieuChi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THELOAITIEUCHI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITheLoaiTieuChi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THELOAITIEUCHI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITheLoaiTieuChi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_THELOAITIEUCHI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
