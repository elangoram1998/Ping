import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAccount } from 'src/app/auth/selectors/account.selectors';
import { Account } from 'src/app/interfaces/account';
import { AppState } from 'src/app/reducers';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  account!: Account;
  accountSubcription$!: Subscription;

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.accountSubcription$ = this.store.pipe(select(selectAccount)).subscribe(
      account => {
        this.account = account;
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent);
  }

  ngOnDestroy(): void {
    this.accountSubcription$.unsubscribe();
  }

}
