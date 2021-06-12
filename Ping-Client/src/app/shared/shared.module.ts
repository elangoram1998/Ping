import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { CallNotificationComponent } from './call-notification/call-notification.component';



@NgModule({
  declarations: [MessageComponent, CallNotificationComponent],
  imports: [
    CommonModule
  ],
  exports: [MessageComponent, CallNotificationComponent]
})
export class SharedModule { }
