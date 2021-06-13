import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Account } from '../interfaces/account';
import { handleError } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerAccount(username: string, email: string, password: string): Observable<{ success: string }> {
    return this.http.post<{ success: string }>(environment.register, { username, email, password }).pipe(
      catchError(handleError)
    );
  }

  loginAccount(username: string, password: string): Observable<{ account: Account, token: string }> {
    return this.http.post<{ account: Account, token: string }>(environment.login, { username, password }).pipe(
      catchError(handleError)
    );
  }

  logoutAccount(): Observable<{ success: string }> {
    return this.http.post<{ success: string }>(environment.logout, {}).pipe(
      catchError(handleError)
    );
  }

  isUsernameAvailable(username: string): Observable<boolean | undefined> {
    let params = new HttpParams().set('username', username);
    return this.http.get<boolean | undefined>(environment.checkUsername, { params });
  }

}
