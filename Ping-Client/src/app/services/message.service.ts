import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../interfaces/message';
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

  updateMessageHeight(roomID: string, message: Message) {
    let params = new HttpParams().set('roomID', roomID || "");
    return this.http.post(environment.updateMessageHeight, { message }, { params }).pipe(
      catchError(handleError)
    );
  }

  updateMessageState(roomID: string, messages: Message[], contactID: string) {
    let params = new HttpParams().set('roomID', roomID).set('contactID', contactID);
    return this.http.patch(environment.updateMessageState, { messages }, { params }).pipe(
      catchError(handleError)
    );
  }

  updateScrollHeight(roomID: string, currectSclHeight: number, totalScrollHeight: number) {
    let params = new HttpParams().set('roomID', roomID);
    return this.http.patch(environment.updateScrollHeight, { currectSclHeight, totalScrollHeight }, { params }).pipe(
      catchError(handleError)
    );
  }
}
