import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { selectAccount } from '../auth/selectors/account.selectors';
import { insertMessage, updateMessageState } from '../chat/actions/messages.actions';
import { selectChatRoom } from '../chat/selectors/messages.selectors';
import { updateMessageCount } from '../home/actions/contacts.actions';
import { Account } from '../interfaces/account';
import { Message } from '../interfaces/message';
import { MessageCollection } from '../interfaces/message-collection';
import { AppState } from '../reducers';
import { handleError } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

  private socket!: Socket;
  account!: Account;
  accountSubscription!: Subscription;

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  connect() {
    const isSocketConnected = localStorage.getItem('socket');
    if (!isSocketConnected) {
      this.socket = io(environment.server);

      this.accountSubscription = this.store.pipe(select(selectAccount)).subscribe(
        account => {
          this.account = account;
        });

      this.socket.on("connect", () => {
        console.log("Application socket ID: " + this.socket.id);
        localStorage.setItem('socket', "loaded");
        this.http.post(environment.storeSocketID, { socketID: this.socket.id, userID: this.account._id }).subscribe(console.log);
      });
      this.socket.on('message', (payload: { message: Message, roomID: string }) => {
        this.updateMessageCollection(payload.message, payload.roomID);
      });
      this.socket.on('updateMsgState', (payload: { roomID: string, updatedMsg: Message[] }) => {
        this.updateMessageState(payload.updatedMsg, payload.roomID);
      });
    }
    else {
      const localSocket = localStorage.getItem('socket') || "";
    }

    return () => {
      console.log("Socket disconnect");
      this.http.post(environment.removeSocketID, { socketID: this.socket.id }).subscribe(console.log);
      localStorage.removeItem('socket');
      this.socket.disconnect();
    }
  }

  sendMessage(text: string, roomID: string, contactID: string, myID: string) {

    this.socket.emit('sendMessage', { roomID, myID, text, contactID }, (response: { message: Message, roomID: string }) => {
      this.updateMessageCollection(response.message, roomID);
    });
  }

  checkOnline(contactID: string): Observable<boolean> {
    const params = new HttpParams().set('contactID', contactID);
    return this.http.get<boolean>(environment.checkOnline, { params }).pipe(
      catchError(handleError)
    );
  }

  updateMessageCollection(message: Message, roomID: string) {
    let myChatRoom!: MessageCollection;
    let chatRoomSubscription: Subscription = this.store.pipe(select(selectChatRoom, { roomID })).subscribe(
      chatRoom => {
        myChatRoom = { ...chatRoom };
      }
    );
    myChatRoom.messages = Object.assign([], myChatRoom.messages);
    myChatRoom.messages.push(message);
    const update: Update<MessageCollection> = {
      id: roomID,
      changes: myChatRoom
    }
    this.store.dispatch(insertMessage({ update }));
    chatRoomSubscription.unsubscribe();
  }

  updateMessageState(messages: Message[], roomID: string) {
    console.log("In service - update message state")
    let myChatRoom!: MessageCollection;
    let chatRoomSubscription: Subscription = this.store.pipe(select(selectChatRoom, { roomID })).subscribe(
      chatRoom => {
        myChatRoom = { ...chatRoom };
      }
    );
    myChatRoom.messages = Object.assign([], myChatRoom.messages);
    messages.forEach(message => {
      myChatRoom.messages[message.messageCount - 1] = message;
    });
    console.log(myChatRoom.messages);
    const update: Update<MessageCollection> = {
      id: roomID,
      changes: myChatRoom
    }
    this.store.dispatch(updateMessageState({ update }));
    chatRoomSubscription.unsubscribe();
  }

  mediaCall(contactID: string, account: Account) {
    this.socket.emit('call', { contactID, account });
  }

  answerCall(callerID: string, peerID: string) {
    this.socket.emit('answer-call', { callerID, peerID });
  }

  disconnectCall(contactID: string, peerID: string) {
    this.socket.emit('disconnect-call', { contactID, peerID });
  }

  cancelMediaCall(contactID: string, account: Account) {
    this.socket.emit('cancel-call', { contactID, account });
  }

  cutCall(contactID: string) {
    this.socket.emit('cut-call', { contactID });
  }

  gettingCall() {
    return Observable.create((observer: any) => {
      this.socket.on('getting-call', (caller: Account) => {
        observer.next(caller);
      });
    });
  }

  hideNotification() {
    return Observable.create((observer: any) => {
      this.socket.on('hide-notification', (caller: Account) => {
        observer.next(caller);
      });
    });
  }

  notResponded() {
    return Observable.create((observer: any) => {
      this.socket.on('not-responded', (contactID: string) => {
        observer.next(contactID);
      });
    });
  }

  callPicked() {
    return Observable.create((observer: any) => {
      this.socket.on('call-picked', (peerID: string) => {
        observer.next(peerID);
      });
    });
  }

  callDisconnected() {
    return Observable.create((observer: any) => {
      this.socket.on('user-disconnected', (peerID: string) => {
        observer.next(peerID);
      });
    });
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
