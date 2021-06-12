import {
  createReducer,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export const accountFeatureKey = 'account';

export interface AccountState {

}

export const initialState: AccountState = {

}

export const accountReducer = createReducer(
  initialState
);


export const metaReducers: MetaReducer<AccountState>[] = !environment.production ? [] : [];
