import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account } from 'src/app/interfaces/account';
import { AppState } from 'src/app/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { loadAccount } from '../actions/account.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePassword: boolean = true;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<AppState>) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  login() {
    this.authService.loginAccount(this.Username?.value, this.Password?.value).pipe(
      tap((res: { account: Account, token: string }) => {
        this.store.dispatch(loadAccount({ account: res.account }));
        this.router.navigate(['home']);
      })
    ).subscribe(
      noop,
      () => {
        this.toastr.error('Username/Password is incorrect', 'Please enter a valid creadentials')
      }
    )
  }

  get Username() {
    return this.loginForm.get('username');
  }

  get Password() {
    return this.loginForm.get('password');
  }
}
