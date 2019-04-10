import {
  ONE,
  TWO,
  THREE
} from './constants';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ONE:
      return {
        ...state
      };
    case TWO:
      return {
        ...state
      };
    case THREE:
      return {
        ...state
      };
    default:
      return state;
  }
}
