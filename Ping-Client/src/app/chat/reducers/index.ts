import {
  createReducer,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export const messagesFeatureKey = 'messages';

export interface MessageState {

}

export const initialState: MessageState = {

}

export const messageReducer = createReducer(
  initialState
)


export const metaReducers: MetaReducer<MessageState>[] = !environment.production ? [] : [];
