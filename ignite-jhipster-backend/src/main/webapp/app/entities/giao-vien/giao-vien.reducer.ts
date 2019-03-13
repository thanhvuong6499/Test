import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IGiaoVien, defaultValue } from 'app/shared/model/giao-vien.model';

export const ACTION_TYPES = {
  SEARCH_GIAOVIENS: 'giaoVien/SEARCH_GIAOVIENS',
  FETCH_GIAOVIEN_LIST: 'giaoVien/FETCH_GIAOVIEN_LIST',
  FETCH_GIAOVIEN: 'giaoVien/FETCH_GIAOVIEN',
  CREATE_GIAOVIEN: 'giaoVien/CREATE_GIAOVIEN',
  UPDATE_GIAOVIEN: 'giaoVien/UPDATE_GIAOVIEN',
  DELETE_GIAOVIEN: 'giaoVien/DELETE_GIAOVIEN',
  RESET: 'giaoVien/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGiaoVien>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type GiaoVienState = Readonly<typeof initialState>;

// Reducer

export default (state: GiaoVienState = initialState, action): GiaoVienState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_GIAOVIENS):
    case REQUEST(ACTION_TYPES.FETCH_GIAOVIEN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GIAOVIEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GIAOVIEN):
    case REQUEST(ACTION_TYPES.UPDATE_GIAOVIEN):
    case REQUEST(ACTION_TYPES.DELETE_GIAOVIEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_GIAOVIENS):
    case FAILURE(ACTION_TYPES.FETCH_GIAOVIEN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GIAOVIEN):
    case FAILURE(ACTION_TYPES.CREATE_GIAOVIEN):
    case FAILURE(ACTION_TYPES.UPDATE_GIAOVIEN):
    case FAILURE(ACTION_TYPES.DELETE_GIAOVIEN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_GIAOVIENS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_GIAOVIEN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_GIAOVIEN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GIAOVIEN):
    case SUCCESS(ACTION_TYPES.UPDATE_GIAOVIEN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GIAOVIEN):
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

const apiUrl = SERVER_API_URL + '/api/giao-viens';
const apiSearchUrl = SERVER_API_URL + '/api/_search/giao-viens';

// Actions

export const getSearchEntities: ICrudSearchAction<IGiaoVien> = query => ({
  type: ACTION_TYPES.SEARCH_GIAOVIENS,
  payload: axios.get<IGiaoVien>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IGiaoVien> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GIAOVIEN_LIST,
  payload: axios.get<IGiaoVien>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IGiaoVien> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GIAOVIEN,
    payload: axios.get<IGiaoVien>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGiaoVien> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GIAOVIEN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGiaoVien> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GIAOVIEN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGiaoVien> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GIAOVIEN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
