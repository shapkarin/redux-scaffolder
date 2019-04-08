import {
  LOAD_START,
  LOAD_SUCCESS,
  LOAD_ERROR
} from './constants';

const initialState = {};

export default function  (state = initialState, action) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state
      };
    case LOAD_SUCCESS:
      return {
        ...state
      };
    case LOAD_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
}
