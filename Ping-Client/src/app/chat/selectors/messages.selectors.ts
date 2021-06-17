import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageCollection } from 'src/app/interfaces/message-collection';
import { MessageState, selectAll } from '../reducers';

export const selectMsgCollectionState = createFeatureSelector<MessageState>('messages');

export const selectAllMsgCollection = createSelector(
    selectMsgCollectionState,
    selectAll
);

export const isMessagesLoaded = createSelector(
    selectAllMsgCollection,
    (chats: MessageCollection[], props: { roomID: string }) => chats.find(chats => chats.roomID === props.roomID)?.areMessagesLoaded
);

export const selectChatRoom = createSelector(
    selectAllMsgCollection,
    (chats: any[], props: { roomID: string }) => chats.find(chats => chats.roomID === props.roomID)
);