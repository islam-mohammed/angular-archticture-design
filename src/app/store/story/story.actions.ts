import { Story } from '@app/models';
import { StoryType } from '@app/services/api/story.service';
import { createAction, props } from '@ngrx/store';

export const fetchStories = createAction('[story page] Fetch  stories');
export const fetchStoriesSuccess = createAction(
  '[story page] Fetch stories success',
  props<{ stories: Story[]; storyType: StoryType }>()
);
export const fetchStoriesError = createAction('[Story api service] Fetch stories error', props<{ message: string }>());
