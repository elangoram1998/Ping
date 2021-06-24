import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { loadMessages, MessagesLoaded, updateMsgHeight, updateScrollHeight } from '../actions/messages.actions';



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

  updateHeight$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateMsgHeight),
        concatMap((action) => {
          const messageCount = action.update.changes.messages?.length || 0;
          const roomID = action.update.changes.roomID || "";
          const messages = action.update.changes.messages || [];
          return this.messageService.updateMessageHeight(roomID, messages[messageCount - 1]);
        }),
      ), { dispatch: false }
  );

  updateScrollHeight$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateScrollHeight),
        concatMap((action) => {
          const roomID = action.update.changes.roomID || "";
          const currectSclHeight = action.update.changes.currectSclHeight || 0;
          const totalScrollHeight = action.update.changes.totalScrollHeight || 0;
          return this.messageService.updateScrollHeight(roomID, currectSclHeight, totalScrollHeight);
        })
      ), { dispatch: false }
  );

  constructor(private actions$: Actions, private messageService: MessageService) { }

}
