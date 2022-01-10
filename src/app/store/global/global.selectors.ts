import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalState } from '.';
export const selectStoreState = createFeatureSelector<GlobalState>('global');

export const selectLoadingStatus = createSelector(selectStoreState, (state: GlobalState) => state.loading);
