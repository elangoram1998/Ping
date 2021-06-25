import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { selectAccount } from 'src/app/auth/selectors/account.selectors';
import { updateMessageCount, updateReadMsgCount } from 'src/app/home/actions/contacts.actions';
import { Account } from 'src/app/interfaces/account';
import { Contact } from 'src/app/interfaces/contact';
import { Message } from 'src/app/interfaces/message';
import { MessageCollection } from 'src/app/interfaces/message-collection';
import { AppState } from 'src/app/reducers';
import { MessageService } from 'src/app/services/message.service';
import { updateMessageState, updateMsgHeight, updateScrollHeight } from '../../actions/messages.actions';
import { selectMessages } from '../../selectors/messages.selectors';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() roomID!: string;
  @Input() contactID!: string;
  @Input() messages!: Message[];
  @Input() contact!: Contact | undefined;
  @Input() chatRoom!: MessageCollection;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChildren('item') itemElement!: QueryList<any>;
  messagesCount: number = 0;
  currentScrollHeight: number = 0;
  updatedMessages: Message[] = [];
  updatedContact!: Contact;
  account!: Account;
  accountSubcription$!: Subscription;

  constructor(private store: Store<AppState>, private messageService: MessageService) { }

  ngOnChanges(): void {
    this.updatedContact = Object.assign({}, this.contact);
  }

  ngOnInit(): void {
    this.updatedMessages = Object.assign(this.updatedMessages, this.messages);
    this.messagesCount = this.updatedMessages.length;
    this.updatedContact = Object.assign({}, this.contact);
    this.currentScrollHeight = this.chatRoom.currectSclHeight;
    this.load();
  }

  load(): void {
    this.accountSubcription$ = this.store.pipe(select(selectAccount)).subscribe(
      account => {
        this.account = account;
      }
    );
  }

  ngAfterViewInit(): void {
    this.itemElement.changes.subscribe(_ => {
      if (this.messagesCount < this.messages.length) {
        console.log(this.itemElement);
        this.updatedMessages = Object.assign(this.updatedMessages, this.messages);
        this.messagesCount = this.updatedMessages.length;
        console.log("size of messages: " + this.itemElement.length);
        let children = this.chatContainer.nativeElement.children;
        let childrenSize = children.length;
        console.log("children size: " + this.chatContainer.nativeElement.children.length);
        let msgTopHeight = 0;
        if (childrenSize > 1) {
          msgTopHeight = (children[childrenSize - 1].offsetTop - 64) + (children[childrenSize - 1].clientHeight + 10);
          console.log(children)
          console.log("message height: " + msgTopHeight);
          this.updatedMessages[childrenSize - 1] = Object.assign({}, this.updatedMessages[childrenSize - 1]);
          this.updatedMessages[childrenSize - 1].messageHeight = msgTopHeight;
        }
        else if (childrenSize == 1 && childrenSize > 0) {
          msgTopHeight = children[0].clientHeight + 10;
          console.log("message height: " + msgTopHeight);
          this.updatedMessages[0] = Object.assign({}, this.updatedMessages[0]);
          this.updatedMessages[0].messageHeight = msgTopHeight;
        }
        console.log(this.updatedMessages);
        this.updateMessageHeight();
        this.updateMessageCount();
        if (this.chatContainer.nativeElement.scrollHeight <= 610) {
          this.currentScrollHeight = this.updatedMessages[childrenSize - 1].messageHeight;
          this.updateScrollHeight(this.currentScrollHeight, this.chatContainer.nativeElement.scrollHeight);
          this.markAsRead();
        }
      }
    });

    fromEvent<Event>(this.chatContainer.nativeElement, 'scroll').pipe(
      map((element: Event) => element.target),
      debounceTime(300)
    ).subscribe((event: any) => {
      console.log("scroll event");
      console.log(event.scrollTop);
      console.log(this.currentScrollHeight);
      if (event.scrollTop + 610 > this.currentScrollHeight) {
        console.log("start the scoll event");
        this.currentScrollHeight = event.scrollTop + 610;
        console.log(this.currentScrollHeight);
        this.markAsRead();
        this.updateScrollHeight(this.currentScrollHeight, this.chatContainer.nativeElement.scrollHeight);
      }
    });
  }

  updateMessageHeight() {
    this.chatRoom.messages = Object.assign([], this.updatedMessages);
    const update: Update<MessageCollection> = {
      id: this.roomID,
      changes: this.chatRoom
    }
    this.store.dispatch(updateMsgHeight({ update }));
  }

  updateMessageState() {
    console.log(this.chatRoom);
    let updatedChatRoom: MessageCollection = { ...this.chatRoom };
    updatedChatRoom.messages = Object.assign([], this.updatedMessages);
    console.log(updatedChatRoom);
    const update: Update<MessageCollection> = {
      id: this.roomID,
      changes: updatedChatRoom
    }
    this.store.dispatch(updateMessageState({ update }));
  }

  updateScrollHeight(currentScrollHeight: number, totalScrollHeight: number) {
    this.chatRoom = Object.assign({}, this.chatRoom);
    this.chatRoom.currectSclHeight = currentScrollHeight;
    this.chatRoom.totalScrollHeight = totalScrollHeight;
    const update: Update<MessageCollection> = {
      id: this.roomID,
      changes: this.chatRoom
    }
    this.store.dispatch(updateScrollHeight({ update }));
  }

  updateMessageCount() {
    this.updatedContact.totalMessageCount++;
    const update: Update<Contact> = {
      id: this.roomID,
      changes: this.updatedContact
    }
    this.store.dispatch(updateMessageCount({ update }));
  }

  updateReadMessageCount(count: number) {
    this.updatedContact.readMessageCount = count;
    const update: Update<Contact> = {
      id: this.roomID,
      changes: this.updatedContact
    }
    this.store.dispatch(updateReadMsgCount({ update }));
  }

  markAsRead() {
    let messagesInInterval = [];
    const start = this.contact?.readMessageCount || 0;
    console.log("start count: " + start);
    let end = 0;
    console.log("inside mark as read");
    for (var i = start; i < this.messagesCount; i++) {
      if (this.updatedMessages[i].messageHeight <= this.currentScrollHeight + 6) {
        console.log("inside first if loop");
        if (this.updatedMessages[i].owner_id._id !== this.account._id) {
          console.log("inside contact message");
          messagesInInterval.push(this.updatedMessages[i]);
          end = i;
        }
      }
      else {
        break;
      }
    }
    if (messagesInInterval.length > 0) {
      console.log("update state");
      console.log(messagesInInterval);
      for (var i = start; i <= end; i++) {
        this.updatedMessages[i] = Object.assign({}, this.updatedMessages[i]);
        console.log("inside state chanhe for loop");
        this.updatedMessages[i].state = 'read';
      }
      console.log(this.updatedMessages);
      this.messageService.updateMessageState(this.roomID, messagesInInterval, this.contactID, this.updatedMessages).subscribe(console.log);
      this.updateMessageState();
      this.updateReadMessageCount(this.updatedMessages[end].messageCount);
    }
  }

  ngOnDestroy() {
    this.accountSubcription$.unsubscribe();
  }

}
