import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { contactAdded } from '../home/actions/contacts.actions';
import { Account } from '../interfaces/account';
import { Contact } from '../interfaces/contact';
import { Search } from '../interfaces/search';
import { AppState } from '../reducers';
import { handleError } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  loadAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.loadContacts).pipe(
      tap(res => console.log(res)),
      catchError(handleError)
    );
  }

  searchUsers(username: string): Observable<Search[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<Search[]>(environment.searchUsers, { params }).pipe(
      catchError(handleError)
    );
  }

  addContact(contactID: string): Observable<Contact> {
    return this.http.post<Contact>(environment.addContact, { contactID }).pipe(
      tap((contact) => {
        this.store.dispatch(contactAdded({ contact }))
      }),
      catchError(handleError)
    );
  }

  editProfile(bio: string, email: string): Observable<Account> {
    return this.http.put<Account>(environment.editProfile, { bio, email }).pipe(
      catchError(handleError)
    );
  }

  changeProfilePic(fd: FormData): Observable<string> {
    return this.http.post<string>(environment.changeProfilePic, fd, { responseType: 'json' }).pipe(
      catchError(handleError)
    );
  }

  removeProfilePic(): Observable<string> {
    return this.http.post<string>(environment.removeProfilePic, {}, { responseType: 'json' }).pipe(
      catchError(handleError)
    );
  }
}
