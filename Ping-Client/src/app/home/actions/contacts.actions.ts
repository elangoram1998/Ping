import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Contact } from 'src/app/interfaces/contact';

export const loadAllContacts = createAction(
  '[Contacts Resolver] Load All Contacts',
);

export const allContactsLoaded = createAction(
  '[Load Contacts Effect] All Contacts Loaded',
  props<{ contacts: Contact[] }>()
);

export const contactAdded = createAction(
  '[New Contact Added] Contact Added',
  props<{ contact: Contact }>()
);

export const updateMessageCount = createAction(
  '[Message Count] Message Count Updated',
  props<{ update: Update<Contact> }>()
);

export const updateMessageState = createAction(
  '[Message State] Message State Updated',
  props<{ update: Update<Contact> }>()
);




