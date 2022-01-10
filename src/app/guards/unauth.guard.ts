import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { filter, map, Observable, take, tap } from 'rxjs';
import * as fromUser from '@app/store/user';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable()
export class UnauthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private store: Store<fromUser.UserState>) {}

  private check(): Observable<boolean> {
    return this.store.select(fromUser.selectUserState).pipe(
      take(1),
      tap(state => {
        if (state.isAuthorized) {
          this.router.navigate(['/']);
        }
      }),
      map(state => !state.isAuthorized)
    );
  }

  canActivate() {
    return this.check();
  }
  canActivateChild() {
    return this.check();
  }
  canLoad() {
    return this.check();
  }
}
