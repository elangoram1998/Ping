import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { loadAllContacts } from '../actions/contacts.actions';
import { areContactsLoaded } from '../selectors/contacts.selectors';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<boolean> {

  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(areContactsLoaded),
      tap((contactsLoaded) => {
        if (!contactsLoaded) {
          this.store.dispatch(loadAllContacts())
        }
      }),
      filter(contactsLoaded => contactsLoaded),
      first(),
    );
  }
}
