import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.actions';

export interface UserState {
  isAuthorized: boolean;
  error: string;
}

export const initialState: UserState = {
  isAuthorized: false,
  error: ''
};

export const userReducer = createReducer(
  initialState,
  on(userActions.init, state => ({ ...state, loading: true })),
  on(userActions.initFinished, (state, { isAuthorized }) => ({
    ...state,
    isAuthorized,
    error: ''
  })),
  on(userActions.login, state => ({ ...state, loading: true })),
  on(userActions.loginSuccess, (state, { isAuthorized }) => ({
    ...state,
    isAuthorized,
    error: ''
  })),
  on(userActions.loginError, (state, { message }) => {
    return {
      ...state,
      error: message
    };
  }),
  on(userActions.register, state => ({ ...state, loading: true })),
  on(userActions.registerSuccess, (state, { isAuthorized }) => ({
    ...state,
    isAuthorized,
    error: ''
  })),
  on(userActions.registerError, (state, { message }) => ({
    ...state,
    error: message
  }))
);
