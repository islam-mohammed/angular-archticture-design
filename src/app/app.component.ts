import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUser from '@app/store/user';
import * as fromGlobal from '@app/store/global';

@Component({
  selector: 'ny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthorized$ = this.store.select(fromUser.selectIsAuthorized);
  loading$ = this.store.select(fromGlobal.selectLoadingStatus);

  constructor(private store: Store<fromUser.UserState>) {
    store.dispatch(fromUser.init());
  }

  onlogOut(): void {
    this.store.dispatch(fromUser.logOut());
  }
}
