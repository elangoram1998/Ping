import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectAccount } from 'src/app/auth/selectors/account.selectors';
import { selectContact } from 'src/app/home/selectors/contacts.selectors';
import { Account } from 'src/app/interfaces/account';
import { Contact } from 'src/app/interfaces/contact';
import { AppState } from 'src/app/reducers';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  roomID: string = "";
  account!: Account;
  accountSubscription!: Subscription;
  contactID: string = "";
  contact!: Contact | undefined;
  contactSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private socketService: SocketService) { }

  messageForm = this.fb.group({
    message: ['', Validators.required]
  });

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

  sendMessage() {
    this.socketService.sendMessage(this.Message?.value, this.roomID, this.contactID, this.account._id);
    if (this.messageForm.valid) {
      setTimeout(() => this.formGroupDirective.resetForm(), 0);
    }
  }

  get Message() {
    return this.messageForm.get('message');
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
    this.contactSubscription.unsubscribe();
  }
}
