import { createAction, props } from '@ngrx/store';

export const startLoading = createAction('[Globla Action] Start loading spinner');

export const stopLoading = createAction('[Globla Action] stop loading spinner');
