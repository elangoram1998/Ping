import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { loadMessages } from '../actions/messages.actions';
import { isMessagesLoaded } from '../selectors/messages.selectors';

@Injectable({
  providedIn: 'root'
})
export class ChatResolver implements Resolve<boolean> {

  roomID: string = "";
  contactID: string = "";
  isChatLoaded: boolean | undefined = false;

  constructor(private router: Router, private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.roomID = route.queryParams.roomID;
    this.contactID = route.queryParams.contactID;
    this.store.pipe(select(isMessagesLoaded, { roomID: this.roomID })).subscribe(loaded => this.isChatLoaded = loaded);
    if (!this.isChatLoaded) {
      this.store.dispatch(loadMessages({ roomID: this.roomID }));
      return of(true);
    }
    return of(false);
  }
}
