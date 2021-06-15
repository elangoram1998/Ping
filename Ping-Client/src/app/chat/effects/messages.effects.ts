import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { loadMessages, MessagesLoaded } from '../actions/messages.actions';



@Injectable()
export class MessagesEffects {

  loadMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadMessages),
        concatMap(action => this.messageService.loadMyMessages(action.roomID)),
        map(messageCollection => MessagesLoaded({ messageCollection: { ...messageCollection, areMessagesLoaded: true } }))
      )
  );

  constructor(private actions$: Actions, private messageService: MessageService) { }

}
