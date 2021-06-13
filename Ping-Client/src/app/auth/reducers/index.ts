import {
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { Account } from 'src/app/interfaces/account';
import { environment } from '../../../environments/environment';
import { loadAccount } from '../actions/account.actions';

export const accountFeatureKey = 'account';

export interface AccountState {
  account: Account
}

export const initialState: AccountState = {
  account: {
    _id: "",
    username: "",
    email: "",
    avatar: "",
    bio: ""
  }
}

export const accountReducer = createReducer(
  initialState,
  on(loadAccount, (state, action) => {
    return {
      account: action.account
    }
  })
);


export const metaReducers: MetaReducer<AccountState>[] = !environment.production ? [] : [];
