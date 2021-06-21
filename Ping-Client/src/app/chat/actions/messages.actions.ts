import { Update } from '@ngrx/entity';
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

export const insertMessage = createAction(
  '[New Message] Insert Message In MessageCollection',
  props<{ update: Update<MessageCollection> }>()
);

export const updateMsgHeight = createAction(
  '[Message Height] Update Message Height',
  props<{ update: Update<MessageCollection> }>()
);




