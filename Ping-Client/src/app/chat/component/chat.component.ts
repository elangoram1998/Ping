import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectAccount } from 'src/app/auth/selectors/account.selectors';
import { selectContact } from 'src/app/home/selectors/contacts.selectors';
import { Account } from 'src/app/interfaces/account';
import { Contact } from 'src/app/interfaces/contact';
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
  contact!: Contact | undefined;
  contactSubscription!: Subscription;

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
    this.load();
  }

  load(): void {
    this.accountSubscription = this.store.pipe(select(selectAccount)).subscribe(
      account => {
        this.account = account;
      }
    );
    this.contactSubscription = this.store.pipe(select(selectContact, { roomID: this.roomID })).subscribe(
      contact => {
        this.contact = contact;
      }
    );
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
    this.contactSubscription.unsubscribe();
  }
}
