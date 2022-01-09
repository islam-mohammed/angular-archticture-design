import { Injectable } from '@angular/core';
import { Story } from '@app/models';
import { StoryService } from '@app/services/api/story.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, exhaustMap, map, of } from 'rxjs';
import * as StoryActions from './story.actions';

@Injectable()
export class StoryEffects {
  constructor(private actions$: Actions, private storyService: StoryService) {}
}
