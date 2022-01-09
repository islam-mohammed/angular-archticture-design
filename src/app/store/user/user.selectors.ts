import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectIsAuthorized = createSelector(
  selectUserState,
  (state) => state.isAuthorized
);
