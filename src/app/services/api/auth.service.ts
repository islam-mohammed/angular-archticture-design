import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailPasswordCredentials } from '@app/store/user';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: EmailPasswordCredentials): Observable<string> {
    return this.http.post<string>(`${environment.autApiUrl}/login`, credentials);
  }

  register(credentials: EmailPasswordCredentials): Observable<string> {
    return this.http.post<string>(`${environment.autApiUrl}/register`, credentials);
  }
}
