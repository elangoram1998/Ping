import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StoreModule } from '@ngrx/store';
import * as fromAccount from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './effects/account.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAccount.accountFeatureKey, fromAccount.accountReducer, { metaReducers: fromAccount.metaReducers }),
    EffectsModule.forFeature([AccountEffects]),
  ]
})
export class AuthModule { }
