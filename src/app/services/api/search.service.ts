import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Story } from '@app/models';
import { environment } from 'environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class SearhService {
  constructor(private http: HttpClient) {}
  getSearchResults(q: string, page: number): Observable<any> {
    const params = new HttpParams().set('api-key', environment.apiKey).set('q', q).set('page', page);
    return this.http.get<any[]>(`/search/v2/articlesearch.json`, { params }).pipe(
      map((data: any) => data.response),
      catchError(error => throwError(error))
    );
  }
}
