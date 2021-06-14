import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/interfaces/contact';
import { AppState } from 'src/app/reducers';
import { selectAllContacts } from '../selectors/contacts.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contacts$!: Observable<Contact[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts$ = this.store.pipe(select(selectAllContacts));
  }

}
