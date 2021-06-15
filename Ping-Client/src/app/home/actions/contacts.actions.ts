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




