import { OnDestroy, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  private _destroy$: Subject<any>;
  get destroy$() {
    if (!this._destroy$) {
      this._destroy$ = new Subject();
    }
    return this._destroy$;
  }

  ngOnDestroy() {
    if (this._destroy$) {
      this._destroy$.next(true);
      this._destroy$.complete();
    }
  }
}
