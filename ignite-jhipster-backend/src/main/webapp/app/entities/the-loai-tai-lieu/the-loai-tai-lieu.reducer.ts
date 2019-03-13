import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ITheLoaiTaiLieu, defaultValue } from 'app/shared/model/the-loai-tai-lieu.model';

export const ACTION_TYPES = {
  SEARCH_THELOAITAILIEUS: 'theLoaiTaiLieu/SEARCH_THELOAITAILIEUS',
  FETCH_THELOAITAILIEU_LIST: 'theLoaiTaiLieu/FETCH_THELOAITAILIEU_LIST',
  FETCH_THELOAITAILIEU: 'theLoaiTaiLieu/FETCH_THELOAITAILIEU',
  CREATE_THELOAITAILIEU: 'theLoaiTaiLieu/CREATE_THELOAITAILIEU',
  UPDATE_THELOAITAILIEU: 'theLoaiTaiLieu/UPDATE_THELOAITAILIEU',
  DELETE_THELOAITAILIEU: 'theLoaiTaiLieu/DELETE_THELOAITAILIEU',
  RESET: 'theLoaiTaiLieu/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITheLoaiTaiLieu>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TheLoaiTaiLieuState = Readonly<typeof initialState>;

// Reducer

export default (state: TheLoaiTaiLieuState = initialState, action): TheLoaiTaiLieuState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_THELOAITAILIEUS):
    case REQUEST(ACTION_TYPES.FETCH_THELOAITAILIEU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THELOAITAILIEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_THELOAITAILIEU):
    case REQUEST(ACTION_TYPES.UPDATE_THELOAITAILIEU):
    case REQUEST(ACTION_TYPES.DELETE_THELOAITAILIEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_THELOAITAILIEUS):
    case FAILURE(ACTION_TYPES.FETCH_THELOAITAILIEU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THELOAITAILIEU):
    case FAILURE(ACTION_TYPES.CREATE_THELOAITAILIEU):
    case FAILURE(ACTION_TYPES.UPDATE_THELOAITAILIEU):
    case FAILURE(ACTION_TYPES.DELETE_THELOAITAILIEU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_THELOAITAILIEUS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THELOAITAILIEU_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THELOAITAILIEU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_THELOAITAILIEU):
    case SUCCESS(ACTION_TYPES.UPDATE_THELOAITAILIEU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_THELOAITAILIEU):
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

const apiUrl = SERVER_API_URL + '/api/the-loai-tai-lieus';
const apiSearchUrl = SERVER_API_URL + '/api/_search/the-loai-tai-lieus';

// Actions

export const getSearchEntities: ICrudSearchAction<ITheLoaiTaiLieu> = query => ({
  type: ACTION_TYPES.SEARCH_THELOAITAILIEUS,
  payload: axios.get<ITheLoaiTaiLieu>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ITheLoaiTaiLieu> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_THELOAITAILIEU_LIST,
  payload: axios.get<ITheLoaiTaiLieu>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITheLoaiTaiLieu> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THELOAITAILIEU,
    payload: axios.get<ITheLoaiTaiLieu>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITheLoaiTaiLieu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THELOAITAILIEU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITheLoaiTaiLieu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THELOAITAILIEU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITheLoaiTaiLieu> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_THELOAITAILIEU,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
