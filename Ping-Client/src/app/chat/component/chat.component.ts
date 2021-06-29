import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { selectAccount } from 'src/app/auth/selectors/account.selectors';
import { selectContact } from 'src/app/home/selectors/contacts.selectors';
import { Account } from 'src/app/interfaces/account';
import { Contact } from 'src/app/interfaces/contact';
import { Message } from 'src/app/interfaces/message';
import { MessageCollection } from 'src/app/interfaces/message-collection';
import { AppState } from 'src/app/reducers';
import { SocketService } from 'src/app/services/socket.service';
import { selectChatRoom, selectMessages } from '../selectors/messages.selectors';

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
  messages: Message[] = [];
  messagesSubscription!: Subscription;
  chatRoomSubscription!: Subscription;
  myChatRoom!: MessageCollection;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private socketService: SocketService,
    private toastr: ToastrService) { }

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
    this.chatRoomSubscription = this.store.pipe(select(selectChatRoom, { roomID: this.roomID })).subscribe(
      chatRoom => {
        this.myChatRoom = { ...chatRoom };
      }
    );
    this.messagesSubscription = this.store.pipe(select(selectMessages, { roomID: this.roomID })).subscribe(
      messages => {
        this.messages = messages || [];
      }
    );
  }

  sendMessage() {
    this.socketService.sendMessage(this.Message?.value, this.roomID, this.contactID, this.account._id);
    if (this.messageForm.valid) {
      setTimeout(() => this.formGroupDirective.resetForm(), 0);
    }
  }

  mediaCall() {
    this.socketService.checkOnline(this.contactID).subscribe(
      isOnline => {
        if (isOnline) {
          this.socketService.checkIsOnCall(this.contactID).subscribe(
            isOnCall => {
              if (isOnCall) {
                this.toastr.info('Please try again later', `${this.contact?.contactID.username} is currently speaking with someone else`);
              }
              else {
                this.router.navigate(['ping/videoOraudioCall'], { queryParams: { contactID: this.contactID, action: 'call' } });
              }
            }
          );
        }
        else {
          this.toastr.info('you cannot call a person, who is not in online. please call again later', `${this.contact?.contactID.username} is not in online`);
        }
      }
    )
  }

  get Message() {
    return this.messageForm.get('message');
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
    this.contactSubscription.unsubscribe();
    this.messagesSubscription.unsubscribe();
    this.chatRoomSubscription.unsubscribe();
  }
}
