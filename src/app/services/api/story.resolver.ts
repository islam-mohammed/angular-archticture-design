import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import * as fromStory from '@app/store/story';
import { Store } from '@ngrx/store';
import { StoryService, StoryType } from './story.service';
import { Story } from '@app/models';

@Injectable()
export class StoryResolver implements Resolve<Story[] | null> {
  constructor(private store: Store<fromStory.StoryState>, private storyService: StoryService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Story[] | null> {
    const storyType: StoryType = (route.params as any).type;

    this.store.dispatch(fromStory.fetchStories());
    if (storyType === StoryType.SCIENCE) {
      return this.getScience$();
    }
    return this.getWorld$();
  }

  getScience$(): Observable<Story[]> {
    return this.store.select(fromStory.selectScienceStories).pipe(
      take(1),
      switchMap((stories: Story[]) => {
        if (stories.length) {
          return of(stories);
        }
        return this.storyService.getStories(StoryType.SCIENCE).pipe(
          take(1),
          tap(stories => this.store.dispatch(fromStory.fetchStoriesSuccess({ stories, storyType: StoryType.SCIENCE }))),
          catchError(error => {
            this.store.dispatch(fromStory.fetchStoriesError({ message: error.message }));
            return throwError(error);
          })
        );
      })
    );
  }
  getWorld$(): Observable<Story[]> {
    return this.store.select(fromStory.selectWorldStories).pipe(
      take(1),
      switchMap((stories: Story[]) => {
        if (stories.length) {
          return of(stories);
        }
        return this.storyService.getStories(StoryType.WORLD).pipe(
          take(1),
          tap(stories => this.store.dispatch(fromStory.fetchStoriesSuccess({ stories, storyType: StoryType.WORLD }))),
          catchError(error => {
            this.store.dispatch(fromStory.fetchStoriesError({ message: error.message }));
            return throwError(error);
          })
        );
      })
    );
  }
}
