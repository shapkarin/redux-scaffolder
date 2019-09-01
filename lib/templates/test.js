import {
  MY,
  SOME,
  _CONSTS
} from './constants';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    
    case MY:
      return {
        ...state
      };
    
    case SOME:
      return {
        ...state
      };
    
    case _CONSTS:
      return {
        ...state
      };
    
    default:
      return state;
  }
}