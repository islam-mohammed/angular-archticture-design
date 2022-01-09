import { createAction, props } from '@ngrx/store';
import { EmailPasswordCredentials } from './user.model';

export const init = createAction('[Application start] Initialize user');
export const initFinished = createAction(
  '[Application start] Initialize finished user',
  props<{ isAuthorized: boolean }>()
);

// Sign In
export const login = createAction(
  '[Login API] Log in',
  props<{ credentials: EmailPasswordCredentials }>()
);

export const loginSuccess = createAction(
  '[Login Page] Log in success',
  props<{ isAuthorized: boolean }>()
);

export const loginError = createAction(
  '[Login Page] Log in error',
  props<{ message: string }>()
);

// Register

export const register = createAction(
  '[Registeration API] Register',
  props<{ credentials: EmailPasswordCredentials }>()
);

export const registerSuccess = createAction(
  '[Registeration Page] Register success',
  props<{ isAuthorized: boolean }>()
);

export const registerError = createAction(
  '[Registeration Page] Register Error',
  props<{ message: string }>()
);

// Log out
export const logOut = createAction('[Application Menu] Log out');

export const logOutSuccess = createAction('[Application Menu] Log out success');
