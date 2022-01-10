import { createReducer, on } from '@ngrx/store';
import * as globalActions from './global.actions';

export interface GlobalState {
  loading: boolean;
}

export const initialState: GlobalState = {
  loading: false
};

export const globalReducer = createReducer(
  initialState,
  on(globalActions.startLoading, state => ({
    ...state,
    loading: true
  })),
  on(globalActions.stopLoading, state => ({
    ...state,
    loading: false
  }))
);
