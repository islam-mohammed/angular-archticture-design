import { Story } from '@app/models';
import { StoryType } from '@app/services/api/story.service';
import { createReducer, on } from '@ngrx/store';
import * as storyActions from './story.actions';

export interface StoryState {
  home: {
    currentPage: number;
    stories: Story[];
  };
  world: {
    currentPage: number;
    stories: Story[];
  };
  science: {
    currentPage: number;
    stories: Story[];
  };
  loading: boolean;
  error: string;
}

export const initialState: StoryState = {
  home: {
    currentPage: 0,
    stories: []
  },
  world: {
    currentPage: 0,
    stories: []
  },
  science: {
    currentPage: 0,
    stories: []
  },
  loading: false,
  error: ''
};

export const storyReducer = createReducer(
  initialState,
  on(storyActions.fetchStories, state => ({
    ...state,
    loading: true
  })),
  on(storyActions.fetchStoriesSuccess, (state, { stories, storyType }) => {
    const storiesWithId: Story[] = JSON.parse(JSON.stringify(stories));

    // O[n]
    for (let i = 0; i < stories.length; i++) {
      storiesWithId[i].id = i + 1;
    }
    switch (storyType) {
      case StoryType.SCIENCE:
        return {
          ...JSON.parse(JSON.stringify(state)),
          science: {
            currentPage: 0,
            stories: storiesWithId
          },
          loading: false,
          error: ''
        };

      case StoryType.WORLD:
        return {
          ...JSON.parse(JSON.stringify(state)),
          world: {
            currentPage: 0,
            stories: storiesWithId
          },
          loading: false,
          error: ''
        };
    }
  }),
  on(storyActions.fetchStoriesError, (state, { message }) => ({
    ...JSON.parse(JSON.stringify(state)),
    loading: false,
    error: message
  }))
);
