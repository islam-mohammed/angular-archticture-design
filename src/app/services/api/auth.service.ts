import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailPasswordCredentials } from '@app/store/user';
import { catchError, Observable } from 'rxjs';
import { handleHttpError } from './httpErrorHandler';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: EmailPasswordCredentials): Observable<string> {
    return this.http
      .post<string>('login', credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(error => handleHttpError(error)));
  }

  register(credentials: EmailPasswordCredentials): Observable<string> {
    return this.http
      .post<string>('register', credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(error => handleHttpError(error)));
  }
}
