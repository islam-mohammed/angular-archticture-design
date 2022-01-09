import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
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
          map(stories => {
            const storiesClone: Story[] = JSON.parse(JSON.stringify(stories));
            for (let i = 0; i < stories.length; i++) {
              storiesClone[i].id = i + 1;
            }
            this.store.dispatch(fromStory.fetchStoriesSuccess({ stories: storiesClone, storyType: StoryType.SCIENCE }));
            return storiesClone;
          }),
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
          map(stories => {
            const storiesClone: Story[] = JSON.parse(JSON.stringify(stories));
            for (let i = 0; i < stories.length; i++) {
              storiesClone[i].id = i + 1;
            }
            this.store.dispatch(fromStory.fetchStoriesSuccess({ stories: storiesClone, storyType: StoryType.WORLD }));
            return storiesClone;
          }),
          catchError(error => {
            this.store.dispatch(fromStory.fetchStoriesError({ message: error.message }));
            return throwError(error);
          })
        );
      })
    );
  }
}
