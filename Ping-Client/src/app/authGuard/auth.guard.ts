import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedIn } from '../auth/selectors/account.selectors';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isUserLogged: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.pipe(select(isLoggedIn)).subscribe(
      isLogged => {
        this.isUserLogged = isLogged;
      }
    );
    const token = localStorage.getItem('token');
    if (!this.isUserLogged || !token) {
      this.router.navigate(['/login']);
    }
    return true;
  }

}
