import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from '../auth/selectors/account.selectors';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  isUserLogged: boolean = false;

  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.store.pipe(select(isLoggedIn)).subscribe(
      isLogged => {
        this.isUserLogged = isLogged;
      }
    );
    const token = localStorage.getItem('token');
    const isApiUrl = !request.url.startsWith(environment.apiUrl) && !request.url.startsWith(environment.socket);
    if (this.isUserLogged && token && isApiUrl) {
      console.log(`jwt intercepted url: ${request.url}`);
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
