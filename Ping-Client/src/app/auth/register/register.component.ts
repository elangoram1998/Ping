import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UniqueUsernameValidator } from 'src/app/utils/asyncValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hidePassword: boolean = true;

  constructor(private authService: AuthService,
    private uniqueUsername: UniqueUsernameValidator,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  registerForm = this.fb.group({
    username: ['', Validators.required, this.uniqueUsername.validate],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]]
  });

  register() {
    this.authService.registerAccount(this.Username?.value, this.Email?.value, this.Password?.value).subscribe(
      () => {
        this.toastr.success('Account Created', 'Please sign in to the application');
        this.router.navigate(['/login']);
      },
      () => {
        this.toastr.error('SignUp Error', 'Unable to create a new account');
      }
    );
  }

  get Username() {
    return this.registerForm.get('username');
  }
  get Email() {
    return this.registerForm.get('email');
  }
  get Password() {
    return this.registerForm.get('password');
  }

}
