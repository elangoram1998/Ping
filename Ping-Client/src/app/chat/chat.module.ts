import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './component/chat.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromMessages from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffects } from './effects/messages.effects';
import { MaterialModule } from '../material/material.module';
import { ContactsEffects } from '../home/effects/contacts.effects';
import { MessagesComponent } from './component/messages/messages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: "",
    component: ChatComponent
  }
]

@NgModule({
  declarations: [ChatComponent, MessagesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromMessages.messagesFeatureKey, fromMessages.messageReducer, { metaReducers: fromMessages.metaReducers }),
    EffectsModule.forFeature([MessagesEffects, ContactsEffects])
  ],
  exports: [RouterModule]
})
export class ChatModule { }
