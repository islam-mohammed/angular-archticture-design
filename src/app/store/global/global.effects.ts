import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, NotificationService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '@app/store/user';
import * as StoryActions from '@app/store/story';
import { tap } from 'rxjs';
@Injectable()
export class GlobalEffects {
  constructor(private actions$: Actions) {}
}
