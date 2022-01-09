import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, EMPTY, filter, map, Observable, of, switchMap, take, tap } from 'rxjs';
import * as fromStory from '@app/store/story';
import { Store } from '@ngrx/store';
import { StoryService, StoryType } from './story.service';
import { Story, Comment } from '@app/models';

@Injectable()
export class CommentResolver implements Resolve<Comment[] | null> {
  fetchedCategories: any = {};
  constructor(private store: Store<fromStory.StoryState>, private storyService: StoryService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Comment[]> {
    const storyType: StoryType = (route.params as any).type;
    const storyId = (route.params as any).id;
    if (storyType === StoryType.SCIENCE) {
      return this.getScience$(storyId);
    }
    return this.getWorld$(storyId);
  }

  getScience$(storyId: number): Observable<Comment[]> {
    return this.store.select(fromStory.selectScienceStoryById(storyId)).pipe(
      take(1),
      switchMap((story: Story) => {
        if (story?.comments?.length) {
          return of(story?.comments);
        }
        return this.storyService.getStoryComments(story.url).pipe(take(1));
      })
    );
  }
  getWorld$(storyId: number): Observable<Comment[]> {
    return this.store.select(fromStory.selectWorldStoryById(storyId)).pipe(
      switchMap((story: Story) => {
        if (story?.comments?.length) {
          return of(story?.comments);
        }
        return this.storyService.getStoryComments(story.url).pipe(take(1));
      })
    );
  }
}
