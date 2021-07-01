import { createAction, props } from '@ngrx/store';
import { Account } from 'src/app/interfaces/account';

export const loadAccount = createAction(
  '[Account] Load Account',
  props<{ account: Account }>()
);

export const updateAccount = createAction(
  '[Update] Account Updated',
  props<{ update: Account }>()
);

export const updatePicture = createAction(
  '[Update Picture] Profile Picture Update',
  props<{ update: Account }>()
);

export const logout = createAction(
  '[Logout] Account Logout'
);




