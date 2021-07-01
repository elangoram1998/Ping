import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { logout, updateAccount } from '../actions/account.actions';


@Injectable()
export class AccountEffects {

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        concatMap(action => this.authService.logoutAccount()),
        tap(res => {
          localStorage.clear();
          this.router.navigate(['/']);
        })
      ), { dispatch: false }
  );

  updateAccount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateAccount),
        concatMap(action => this.homeService.editProfile(action.update.bio || "", action.update.email)),
        tap(res => {
          localStorage.removeItem('account');
          localStorage.setItem('account', JSON.stringify(res));
        })
      ), { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router, private homeService: HomeService) { }

}
