import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { selectAccount } from '../auth/selectors/account.selectors';
import { Account } from '../interfaces/account';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

  private socket!: Socket;
  account!: Account;
  accountSubscription!: Subscription;

  constructor(private http: HttpClient, private store: Store<AppState>) { }

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

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
