import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { logout } from '../actions/account.actions';


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
  )

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }

}
