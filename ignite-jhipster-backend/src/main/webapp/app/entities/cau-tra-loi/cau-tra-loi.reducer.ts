import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { ICauTraLoi, defaultValue } from 'app/shared/model/cau-tra-loi.model';

export const ACTION_TYPES = {
  SEARCH_CAUTRALOIS: 'cauTraLoi/SEARCH_CAUTRALOIS',
  FETCH_CAUTRALOI_LIST: 'cauTraLoi/FETCH_CAUTRALOI_LIST',
  FETCH_CAUTRALOI: 'cauTraLoi/FETCH_CAUTRALOI',
  CREATE_CAUTRALOI: 'cauTraLoi/CREATE_CAUTRALOI',
  UPDATE_CAUTRALOI: 'cauTraLoi/UPDATE_CAUTRALOI',
  DELETE_CAUTRALOI: 'cauTraLoi/DELETE_CAUTRALOI',
  RESET: 'cauTraLoi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICauTraLoi>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CauTraLoiState = Readonly<typeof initialState>;

// Reducer

export default (state: CauTraLoiState = initialState, action): CauTraLoiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CAUTRALOIS):
    case REQUEST(ACTION_TYPES.FETCH_CAUTRALOI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CAUTRALOI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CAUTRALOI):
    case REQUEST(ACTION_TYPES.UPDATE_CAUTRALOI):
    case REQUEST(ACTION_TYPES.DELETE_CAUTRALOI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CAUTRALOIS):
    case FAILURE(ACTION_TYPES.FETCH_CAUTRALOI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CAUTRALOI):
    case FAILURE(ACTION_TYPES.CREATE_CAUTRALOI):
    case FAILURE(ACTION_TYPES.UPDATE_CAUTRALOI):
    case FAILURE(ACTION_TYPES.DELETE_CAUTRALOI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CAUTRALOIS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAUTRALOI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAUTRALOI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CAUTRALOI):
    case SUCCESS(ACTION_TYPES.UPDATE_CAUTRALOI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CAUTRALOI):
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

const apiUrl = SERVER_API_URL + '/api/cau-tra-lois';
const apiSearchUrl = SERVER_API_URL + '/api/_search/cau-tra-lois';

// Actions

export const getSearchEntities: ICrudSearchAction<ICauTraLoi> = query => ({
  type: ACTION_TYPES.SEARCH_CAUTRALOIS,
  payload: axios.get<ICauTraLoi>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICauTraLoi> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CAUTRALOI_LIST,
  payload: axios.get<ICauTraLoi>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICauTraLoi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CAUTRALOI,
    payload: axios.get<ICauTraLoi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICauTraLoi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CAUTRALOI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICauTraLoi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CAUTRALOI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICauTraLoi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CAUTRALOI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
