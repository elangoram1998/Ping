import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { accountReducer } from '../auth/reducers';
import { messageReducer } from '../chat/reducers';
import { contactReducer } from '../home/reducers';


export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  account: accountReducer,
  contacts: contactReducer,
  messages: messageReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
