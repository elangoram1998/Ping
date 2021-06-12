import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromContacts from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from './effects/contacts.effects';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromContacts.contactsFeatureKey, fromContacts.contactReducer, { metaReducers: fromContacts.metaReducers }),
    EffectsModule.forFeature([ContactsEffects])
  ],
  exports: [RouterModule]
})
export class HomeModule { }
