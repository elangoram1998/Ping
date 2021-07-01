import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { updateAccount, updatePicture } from 'src/app/auth/actions/account.actions';
import { selectAccount } from 'src/app/auth/selectors/account.selectors';
import { Account } from 'src/app/interfaces/account';
import { AppState } from 'src/app/reducers';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  account!: Account;
  accountSubscription$!: Subscription;
  editForm!: FormGroup;
  selectedFile!: File;

  avatarForm = this.fb.group({
    image: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private homeService: HomeService,
    private dialogRef: MatDialogRef<EditProfileComponent>) { }

  ngOnInit(): void {
    this.accountSubscription$ = this.store.pipe(select(selectAccount)).subscribe(
      account => {
        this.account = account;
      }
    );

    this.editForm = this.fb.group({
      bio: [this.account.bio],
      email: [this.account.email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }

  editUser() {
    const update: Account = {
      ...this.account,
      ...this.editForm.value
    }
    this.store.dispatch(updateAccount({ update }));
    this.dialogRef.close();
    this.snackBar.open('Account Updated', 'Close', {
      duration: 3000
    });
  }

  onChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0];
      this.avatarForm.get('image')?.setValue(this.selectedFile);
      this.changeProfilePicture('change');
    }
  }

  changeProfilePicture(type: string) {
    if (type === 'change') {
      const formData = new FormData();
      formData.append('post', this.avatarForm.get('image')?.value);
      this.homeService.changeProfilePic(formData).pipe(
        tap(avatar => {
          this.account = Object.assign({}, this.account);
          this.account.avatar = avatar;
          const update: Account = {
            ...this.account
          }
          this.store.dispatch(updatePicture({ update }));
        })
      ).subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.open('Profile Picture Updated', 'Close', {
            duration: 3000
          });
        });
    }
    else {
      this.homeService.removeProfilePic().pipe(
        tap(avatar => {
          this.account = Object.assign({}, this.account);
          this.account.avatar = avatar;
          const update: Account = {
            ...this.account
          }
          this.store.dispatch(updatePicture({ update }));
        })
      ).subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.open('Profile Picture Updated', 'Close', {
            duration: 3000
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.accountSubscription$.unsubscribe();
  }

}
