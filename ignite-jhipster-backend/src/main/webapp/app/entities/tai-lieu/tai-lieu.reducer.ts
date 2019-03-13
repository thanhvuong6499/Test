import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ITaiLieu, defaultValue } from 'app/shared/model/tai-lieu.model';

export const ACTION_TYPES = {
  SEARCH_TAILIEUS: 'taiLieu/SEARCH_TAILIEUS',
  FETCH_TAILIEU_LIST: 'taiLieu/FETCH_TAILIEU_LIST',
  FETCH_TAILIEU: 'taiLieu/FETCH_TAILIEU',
  CREATE_TAILIEU: 'taiLieu/CREATE_TAILIEU',
  UPDATE_TAILIEU: 'taiLieu/UPDATE_TAILIEU',
  DELETE_TAILIEU: 'taiLieu/DELETE_TAILIEU',
  RESET: 'taiLieu/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITaiLieu>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TaiLieuState = Readonly<typeof initialState>;

// Reducer

export default (state: TaiLieuState = initialState, action): TaiLieuState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_TAILIEUS):
    case REQUEST(ACTION_TYPES.FETCH_TAILIEU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TAILIEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TAILIEU):
    case REQUEST(ACTION_TYPES.UPDATE_TAILIEU):
    case REQUEST(ACTION_TYPES.DELETE_TAILIEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_TAILIEUS):
    case FAILURE(ACTION_TYPES.FETCH_TAILIEU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TAILIEU):
    case FAILURE(ACTION_TYPES.CREATE_TAILIEU):
    case FAILURE(ACTION_TYPES.UPDATE_TAILIEU):
    case FAILURE(ACTION_TYPES.DELETE_TAILIEU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_TAILIEUS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAILIEU_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAILIEU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TAILIEU):
    case SUCCESS(ACTION_TYPES.UPDATE_TAILIEU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TAILIEU):
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

const apiUrl = SERVER_API_URL + '/api/tai-lieus';
const apiSearchUrl = SERVER_API_URL + '/api/_search/tai-lieus';

// Actions

export const getSearchEntities: ICrudSearchAction<ITaiLieu> = query => ({
  type: ACTION_TYPES.SEARCH_TAILIEUS,
  payload: axios.get<ITaiLieu>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ITaiLieu> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TAILIEU_LIST,
  payload: axios.get<ITaiLieu>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITaiLieu> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TAILIEU,
    payload: axios.get<ITaiLieu>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITaiLieu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TAILIEU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITaiLieu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TAILIEU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITaiLieu> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TAILIEU,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
