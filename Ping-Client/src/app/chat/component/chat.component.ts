import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAccount } from 'src/app/auth/selectors/account.selectors';
import { Account } from 'src/app/interfaces/account';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  roomID: string = "";
  account!: Account;
  accountSubscription!: Subscription;
  contactID: string = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.roomID = params.roomID;
        this.contactID = params.contactID;
      }
    );
    this.accountSubscription = this.store.pipe(select(selectAccount)).subscribe(
      account => {
        this.account = account;
      }
    );
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
