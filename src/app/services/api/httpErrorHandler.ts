import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleHttpError(error: HttpErrorResponse): Observable<string> {
  return throwError(error.statusText);
}
