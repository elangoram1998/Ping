import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadAccount } from './auth/actions/account.actions';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ping-Client';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    const account = localStorage.getItem('account');

    if (account) {
      this.store.dispatch(loadAccount({ account: JSON.parse(account) }));
    }
  }
}
