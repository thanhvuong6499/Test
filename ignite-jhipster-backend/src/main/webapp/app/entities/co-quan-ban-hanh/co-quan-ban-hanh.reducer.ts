import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICoQuanBanHanh, defaultValue } from 'app/shared/model/co-quan-ban-hanh.model';

export const ACTION_TYPES = {
  SEARCH_COQUANBANHANHS: 'coQuanBanHanh/SEARCH_COQUANBANHANHS',
  FETCH_COQUANBANHANH_LIST: 'coQuanBanHanh/FETCH_COQUANBANHANH_LIST',
  FETCH_COQUANBANHANH: 'coQuanBanHanh/FETCH_COQUANBANHANH',
  CREATE_COQUANBANHANH: 'coQuanBanHanh/CREATE_COQUANBANHANH',
  UPDATE_COQUANBANHANH: 'coQuanBanHanh/UPDATE_COQUANBANHANH',
  DELETE_COQUANBANHANH: 'coQuanBanHanh/DELETE_COQUANBANHANH',
  RESET: 'coQuanBanHanh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICoQuanBanHanh>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CoQuanBanHanhState = Readonly<typeof initialState>;

// Reducer

export default (state: CoQuanBanHanhState = initialState, action): CoQuanBanHanhState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COQUANBANHANHS):
    case REQUEST(ACTION_TYPES.FETCH_COQUANBANHANH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COQUANBANHANH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COQUANBANHANH):
    case REQUEST(ACTION_TYPES.UPDATE_COQUANBANHANH):
    case REQUEST(ACTION_TYPES.DELETE_COQUANBANHANH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_COQUANBANHANHS):
    case FAILURE(ACTION_TYPES.FETCH_COQUANBANHANH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COQUANBANHANH):
    case FAILURE(ACTION_TYPES.CREATE_COQUANBANHANH):
    case FAILURE(ACTION_TYPES.UPDATE_COQUANBANHANH):
    case FAILURE(ACTION_TYPES.DELETE_COQUANBANHANH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_COQUANBANHANHS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COQUANBANHANH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COQUANBANHANH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COQUANBANHANH):
    case SUCCESS(ACTION_TYPES.UPDATE_COQUANBANHANH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COQUANBANHANH):
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

const apiUrl = SERVER_API_URL + '/api/co-quan-ban-hanhs';
const apiSearchUrl = SERVER_API_URL + '/api/_search/co-quan-ban-hanhs';

// Actions

export const getSearchEntities: ICrudSearchAction<ICoQuanBanHanh> = query => ({
  type: ACTION_TYPES.SEARCH_COQUANBANHANHS,
  payload: axios.get<ICoQuanBanHanh>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICoQuanBanHanh> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COQUANBANHANH_LIST,
  payload: axios.get<ICoQuanBanHanh>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICoQuanBanHanh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COQUANBANHANH,
    payload: axios.get<ICoQuanBanHanh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICoQuanBanHanh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COQUANBANHANH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICoQuanBanHanh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COQUANBANHANH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICoQuanBanHanh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COQUANBANHANH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
