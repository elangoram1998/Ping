import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contact } from '../interfaces/contact';
import { handleError } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  loadAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.loadContacts).pipe(
      tap(res => console.log(res)),
      catchError(handleError)
    );
  }
}
