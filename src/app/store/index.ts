import { ActionReducerMap } from '@ngrx/store';
import * as userStore from './user';
import * as storyStore from './story';
export interface State {
  user: userStore.UserState;
  stories: storyStore.StoryState;
}

export const reducers: ActionReducerMap<State> = {
  user: userStore.userReducer,
  stories: storyStore.storyReducer
};

export const effects = [userStore.UserEffects, storyStore.StoryEffects];
