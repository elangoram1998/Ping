import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { HomeService } from 'src/app/services/home.service';
import { allContactsLoaded, loadAllContacts } from '../actions/contacts.actions';



@Injectable()
export class ContactsEffects {

  loadContacts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadAllContacts),
        concatMap(action => this.homeService.loadAllContacts()),
        map(contacts => allContactsLoaded({ contacts }))
      ),
  );

  constructor(private actions$: Actions, private homeService: HomeService) { }

}
