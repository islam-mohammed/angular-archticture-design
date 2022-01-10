import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from 'environments/environment';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = localStorage.getItem('token');
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && !authReq.url.includes('auth') && error.status === 401) {
          return this.handle401Error(authReq, next);
        }

        return throwError(error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      //////////////////////////////////////////////////////////////////////////////////
      // I don't have the refresh token so I am not able to refresh the access token  //
      // if it is expird!!!                                                            //
      //////////////////////////////////////////////////////////////////////////////////

      // const token = this.tokenService.getRefreshToken();
      // if (token)
      //   return this.authService.refreshToken(token).pipe(
      //     switchMap((token: any) => {
      //       this.isRefreshing = false;

      //       this.tokenService.saveToken(token.accessToken);
      //       this.refreshTokenSubject.next(token.accessToken);

      //       return next.handle(this.addTokenHeader(request, token.accessToken));
      //     }),
      //     catchError((err) => {
      //       this.isRefreshing = false;

      //       this.tokenService.logOut();
      //       return throwError(err);
      //     })
      //   );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(request, token)))
    );
  }
}
