import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadAccount } from './auth/actions/account.actions';
import { AppState } from './reducers';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Ping-Client';
  disposeSocketConnection!: VoidFunction;

  constructor(private store: Store<AppState>, private socketService: SocketService) { }

  ngOnInit(): void {
    const account = localStorage.getItem('account');

    if (account) {
      this.store.dispatch(loadAccount({ account: JSON.parse(account) }));
    }
    this.disposeSocketConnection = this.socketService.connect();
  }

  ngOnDestroy(): void {
    this.disposeSocketConnection();
  }
}
