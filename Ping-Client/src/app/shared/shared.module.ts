import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { CallNotificationComponent } from './call-notification/call-notification.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [MessageComponent, CallNotificationComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MessageComponent, CallNotificationComponent]
})
export class SharedModule { }
