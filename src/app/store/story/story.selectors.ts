import { Story } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoryState } from '.';

export const selectStoreState = createFeatureSelector<StoryState>('stories');

export const selectHomeStories = createSelector(selectStoreState, (state: StoryState) => state?.home?.stories);
export const selectWorldStories = createSelector(selectStoreState, (state: StoryState) => state?.world?.stories);
export const selectScienceStories = createSelector(selectStoreState, (state: StoryState) => state?.science?.stories);

export const selectWorldStoryById = (id: number) =>
  createSelector(selectWorldStories, stories => {
    if (stories.length) {
      return (stories as Story[]).find(story => story.id === +id);
    } else {
      return null;
    }
  });
export const selectScienceStoryById = (id: number) =>
  createSelector(selectScienceStories, stories => {
    if (stories.length) {
      return (stories as Story[]).find(story => story.id === +id);
    }
    return null;
  });
