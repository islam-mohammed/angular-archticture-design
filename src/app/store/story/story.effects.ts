import { Injectable } from '@angular/core';

import { StoryService } from '@app/services/api/story.service';
import { Actions } from '@ngrx/effects';

@Injectable()
export class StoryEffects {
  constructor(private actions$: Actions, private storyService: StoryService) {}
}
