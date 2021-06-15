import { createAction, props } from '@ngrx/store';
import { MessageCollection } from 'src/app/interfaces/message-collection';

export const loadMessages = createAction(
  '[Messages Resolver] Load Messages',
  props<{ roomID: string }>()
);

export const MessagesLoaded = createAction(
  '[Load ChatRoom Messages] Messages Loaded',
  props<{ messageCollection: MessageCollection }>()
);




