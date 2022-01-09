import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Story, Comment } from '@app/models';
import { environment } from 'environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

export enum StoryType {
  WORLD = 'world',
  SCIENCE = 'science'
}

@Injectable()
export class StoryService {
  constructor(private http: HttpClient) {}

  getStories(storyType: StoryType): Observable<Story[]> {
    const params = new HttpParams().set('api-key', environment.apiKey);
    params.set('api-key', environment.apiKey);
    return this.http.get<Story[]>(`/topstories/v2/${storyType}.json`, { params }).pipe(
      map((data: any) => data.results),
      catchError(error => throwError(error))
    );
  }
  getStoryComments(url: string, offset = 0): Observable<Comment[]> {
    const params = new HttpParams().set('api-key', environment.apiKey).set('offset', offset).set('url', url);
    return this.http.get<Comment[]>(`/community/v3/user-content/url.json`, { params }).pipe(
      map((data: any) => data.results?.comments),
      catchError(error => throwError(error))
    );
  }
}
