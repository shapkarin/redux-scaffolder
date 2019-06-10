import {
  LOAD_START,
  LOAD_SUCCESS,
  LOAD_ERROR
} from './constants';

export const loadStart = () => ({
  type: LOAD_START
});

export const loadSuccess = () => ({
  type: LOAD_SUCCESS
});

export const loadError = () => ({
  type: LOAD_ERROR
});
