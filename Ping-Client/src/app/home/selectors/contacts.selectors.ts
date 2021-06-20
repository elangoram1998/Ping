import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Contact } from 'src/app/interfaces/contact';
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

export const selectContact = createSelector(
    selectAllContacts,
    (contacts: Contact[], props: { roomID: string }) => contacts.find(contacts => contacts.roomID === props.roomID)
);

export const selectContactByID = createSelector(
    selectAllContacts,
    (contacts: Contact[], props: { contactID: string }) => contacts.find(contacts => contacts.contactID._id === props.contactID)
);