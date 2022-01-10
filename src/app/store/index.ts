import { ActionReducerMap } from '@ngrx/store';
import * as userStore from './user';
import * as storyStore from './story';
import * as globalStore from './global';
export interface State {
  user: userStore.UserState;
  stories: storyStore.StoryState;
  global: globalStore.GlobalState;
}

export const reducers: ActionReducerMap<State> = {
  user: userStore.userReducer,
  stories: storyStore.storyReducer,
  global: globalStore.globalReducer
};

export const effects = [userStore.UserEffects, storyStore.StoryEffects, globalStore.GlobalEffects];
