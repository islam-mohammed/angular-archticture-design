import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.actions';

export interface UserState {
  isAuthorized: boolean;
  loading: boolean;
  error: string;
}

export const initialState: UserState = {
  isAuthorized: false,
  loading: false,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(userActions.init, (state) => ({ ...state, loading: true })),
  on(userActions.initFinished, (state, { isAuthorized }) => ({
    ...state,
    isAuthorized,
    loading: false,
    error: '',
  })),
  on(userActions.login, (state) => ({ ...state, loading: true })),
  on(userActions.loginSuccess, (state, { isAuthorized }) => ({
    ...state,
    isAuthorized,
    loading: false,
    error: '',
  })),
  on(userActions.loginError, (state, { message }) => ({
    ...state,
    loading: false,
    error: message,
  })),
  on(userActions.register, (state) => ({ ...state, loading: true })),
  on(userActions.registerSuccess, (state, { isAuthorized }) => ({
    ...state,
    isAuthorized,
    loading: false,
    error: '',
  })),
  on(userActions.registerError, (state, { message }) => ({
    ...state,
    loading: false,
    error: message,
  })),
  on(userActions.logOut, (state) => ({ ...state, loading: true })),
  on(userActions.logOutSuccess, (_) => ({ ...initialState }))
);
