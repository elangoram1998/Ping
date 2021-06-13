import { createAction, props } from '@ngrx/store';
import { Account } from 'src/app/interfaces/account';

export const loadAccount = createAction(
  '[Account] Load Account',
  props<{ account: Account }>()
);




