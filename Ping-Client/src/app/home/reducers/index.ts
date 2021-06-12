import {
  createReducer,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export const contactsFeatureKey = 'contacts';

export interface ContactState {

}

export const initialState: ContactState = {

}

export const contactReducer = createReducer(
  initialState
);


export const metaReducers: MetaReducer<ContactState>[] = !environment.production ? [] : [];
