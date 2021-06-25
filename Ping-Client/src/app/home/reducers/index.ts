import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { Contact } from 'src/app/interfaces/contact';
import { environment } from '../../../environments/environment';
import { allContactsLoaded, contactAdded, updateMessageCount, updateReadMsgCount } from '../actions/contacts.actions';

export const contactsFeatureKey = 'contacts';

export interface ContactState extends EntityState<Contact> {
  allContactsLoaded: boolean
}

export const adapter = createEntityAdapter<Contact>({
  selectId: (contact: Contact) => contact.roomID
});

export const initialState = adapter.getInitialState({
  allContactsLoaded: false
});

export const contactReducer = createReducer(
  initialState,
  on(allContactsLoaded, (state, action) => adapter.addMany(action.contacts, { ...state, allContactsLoaded: true })),
  on(contactAdded, (state, action) => adapter.addOne(action.contact, state)),
  on(updateMessageCount, (state, action) => adapter.updateOne(action.update, state)),
  on(updateReadMsgCount, (state, action) => adapter.updateOne(action.update, state))
);

export const { selectAll } = adapter.getSelectors();

export const metaReducers: MetaReducer<ContactState>[] = !environment.production ? [] : [];
