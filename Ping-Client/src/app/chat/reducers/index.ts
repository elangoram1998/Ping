import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { MessageCollection } from 'src/app/interfaces/message-collection';
import { environment } from '../../../environments/environment';
import { insertMessage, MessagesLoaded, updateMsgHeight, updateMsgState, updateScrollHeight } from '../actions/messages.actions';

export const messagesFeatureKey = 'messages';

export interface MessageState extends EntityState<MessageCollection> {

}

export const adapter = createEntityAdapter<MessageCollection>({
  selectId: (messageCollection: MessageCollection) => messageCollection.roomID
});

export const initialState = adapter.getInitialState();

export const messageReducer = createReducer(
  initialState,
  on(MessagesLoaded, (state, action) => adapter.addOne(action.messageCollection, state)),
  on(insertMessage, (state, action) => adapter.updateOne(action.update, state)),
  on(updateMsgHeight, (state, action) => adapter.updateOne(action.update, state)),
  on(updateMsgState, (state, action) => adapter.updateOne(action.update, state)),
  on(updateScrollHeight, (state, action) => adapter.updateOne(action.update, state))
);

export const { selectAll } = adapter.getSelectors();


export const metaReducers: MetaReducer<MessageState>[] = !environment.production ? [] : [];
