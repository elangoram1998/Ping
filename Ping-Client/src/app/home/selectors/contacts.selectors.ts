import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState, selectAll } from '../reducers';

export const selectContactState = createFeatureSelector<ContactState>("contacts");

export const selectAllContacts = createSelector(
    selectContactState,
    selectAll
);

export const areContactsLoaded = createSelector(
    selectContactState,
    state => state.allContactsLoaded
);