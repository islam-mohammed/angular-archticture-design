import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import * as globalActions from '@app/store/global';
import { AuthService, NotificationService } from '@app/services';
import { Router } from '@angular/router';
import { IsValidToken } from '@app/shared/utils';

@Injectable()
export class UserEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.init),
      map(_ => {
        const token = localStorage.getItem('token');
        if (token) {
          if (IsValidToken(token)) {
            return UserActions.initFinished({ isAuthorized: true });
          }
        }
        return UserActions.initFinished({ isAuthorized: false });
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      tap(_ => {
        globalActions.startLoading();
      }),
      exhaustMap(action => {
        return this.authService.login(action.credentials).pipe(
          map(token => {
            this.saveToken(token);
            this.router.navigateByUrl('/');
            globalActions.stopLoading();
            return UserActions.loginSuccess({ isAuthorized: true });
          }),
          catchError((errorObj: any) => {
            globalActions.stopLoading();
            this.notificationService.error(errorObj.error.message);
            return of(UserActions.loginError({ message: errorObj.error.message }));
          })
        );
      })
    )
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      tap(_ => globalActions.startLoading()),
      exhaustMap(action =>
        this.authService.register(action.credentials).pipe(
          map(token => {
            this.saveToken(token);
            this.router.navigateByUrl('/');
            globalActions.stopLoading();
            return UserActions.registerSuccess({ isAuthorized: true });
          }),
          catchError((errorObj: any) => {
            globalActions.stopLoading();
            this.notificationService.error(errorObj.error.message);
            return of(UserActions.loginError({ message: errorObj.error.message }));
          })
        )
      )
    )
  );
  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logOut),
      map(_ => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/');
        globalActions.startLoading();
        return UserActions.logOutSuccess();
      })
    )
  );

  private saveToken(token: string) {
    localStorage.setItem('token', (token as any).access_token);
  }
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
}
