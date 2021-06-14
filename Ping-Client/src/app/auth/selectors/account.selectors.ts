import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from '../reducers';

export const selectAccountState = createFeatureSelector<AccountState>('account');

export const selectAccount = createSelector(
    selectAccountState,
    (state) => state.account
);

export const isLoggedIn = createSelector(
    selectAccount,
    (account) => !!account._id
);