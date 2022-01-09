import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { AuthService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { IsValidToken } from '@app/shared/utils';

@Injectable()
export class UserEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.init),
      map((_) => {
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
      exhaustMap((action) => {
        return this.authService.login(action.credentials).pipe(
          map((token) => {
            this.saveToken(token);
            this.router.navigateByUrl('/');
            return UserActions.loginSuccess({ isAuthorized: true });
          }),
          catchError((error: any) =>
            of(UserActions.loginError({ message: error.message }))
          )
        );
      })
    )
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      exhaustMap((action) =>
        this.authService.register(action.credentials).pipe(
          map((token) => {
            this.saveToken(token);
            this.router.navigateByUrl('/');
            return UserActions.registerSuccess({ isAuthorized: true });
          }),
          catchError((error: any) =>
            of(UserActions.registerError({ message: error.message }))
          )
        )
      )
    )
  );
  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logOut),
      map((_) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/');
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
    private route: ActivatedRoute
  ) {}
}
