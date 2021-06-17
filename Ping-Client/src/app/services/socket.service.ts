import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { selectAccount } from '../auth/selectors/account.selectors';
import { insertMessage } from '../chat/actions/messages.actions';
import { selectChatRoom } from '../chat/selectors/messages.selectors';
import { Account } from '../interfaces/account';
import { Message } from '../interfaces/message';
import { MessageCollection } from '../interfaces/message-collection';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

  private socket!: Socket;
  account!: Account;
  accountSubscription!: Subscription;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    // this.receiveMessage().subscribe(
    //   (roomID: string, message: Message) => {
    //     this.updateMessageCollection(message, roomID);
    //   });
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
        localStorage.setItem('socket', 'loaded');
        this.http.post(environment.storeSocketID, { socketID: this.socket.id, userID: this.account._id }).subscribe(console.log);
      });
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

  updateMessageCollection(message: Message, roomID: string) {
    let myChatRoom!: MessageCollection;
    let chatRoomSubscription: Subscription = this.store.pipe(select(selectChatRoom, { roomID })).subscribe(
      chatRoom => {
        myChatRoom = { ...chatRoom };
      }
    );
    console.log(myChatRoom);
    myChatRoom.messages = Object.assign([], myChatRoom.messages);
    myChatRoom.messages.push(message);
    const update: Update<MessageCollection> = {
      id: roomID,
      changes: myChatRoom
    }
    this.store.dispatch(insertMessage({ update }));
    chatRoomSubscription.unsubscribe();
  }

  receiveMessage() {
    return Observable.create((observer: any) => {
      this.socket.on('message', (payload: { message: Message, roomID: string }) => {
        console.log("Incoming message: " + payload.message.message);
        observer.next(payload.roomID, payload.message);
      });
    });
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
