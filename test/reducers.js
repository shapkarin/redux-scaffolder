import {
  ONE,
  TWO,
  THREE,
  FOUR,
} from './constants';

const initialState = {};

export default function  (state = initialState, action) {
  switch (action.type) {
    case ONE:
      return {
        ...state
      }
    case TWO:
      return {
        ...state
      }
    case THREE:
      return {
        ...state
      }
    case FOUR:
      return {
        ...state
      }
    default:
      return state;
  }
}
