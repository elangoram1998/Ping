import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageCollection } from '../interfaces/message-collection';
import { handleError } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  loadMyMessages(roomID: string): Observable<MessageCollection> {
    let params = new HttpParams().set('roomID', roomID);
    return this.http.get<MessageCollection>(environment.loadMyMessages, { params }).pipe(
      catchError(handleError)
    );
  }
}
