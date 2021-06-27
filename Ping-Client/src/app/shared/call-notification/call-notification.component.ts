import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/interfaces/account';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-call-notification',
  templateUrl: './call-notification.component.html',
  styleUrls: ['./call-notification.component.css']
})
export class CallNotificationComponent implements OnInit, OnDestroy {

  private callSubscription: Subscription = new Subscription;
  private cancelSubscription: Subscription = new Subscription;
  notification: boolean = true;
  callers: Account[] = [];
  timeout!: any;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
    this.callSubscription = this.socketService.gettingCall().subscribe(
      (caller: Account) => {
        this.notification = true;
        this.callers.push(caller);
        this.timeout = setTimeout(() => {
          this.notification = false;
          this.cutCall(caller._id);
        }, 30000)
      });

    this.cancelSubscription = this.socketService.hideNotification().subscribe(
      (caller: Account) => {
        clearTimeout(this.timeout);
        this.cancelCall(caller._id);
      }
    )
  }

  answerCall(callerID: string) {
    clearTimeout(this.timeout);
    this.router.navigate(['videoOraudioCall'], { queryParams: { contactID: callerID, action: 'callAnswered' } });
  }

  cancellAllCalls(exception: string) {
    this.callers.forEach(caller => {
      console.log("caller: " + caller);
      if (caller._id !== exception) {
        this.cutCall(caller._id);
      }
    });
  }

  cutCall(callerID: string) {
    clearTimeout(this.timeout);
    this.socketService.cutCall(callerID);
    this.cancelCall(callerID);
  }

  cancelCall(callerID: string) {
    const index = this.callers.findIndex(caller => caller._id === callerID);
    if (index != -1) {
      this.callers.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.callSubscription.unsubscribe();
    this.cancelSubscription.unsubscribe();
  }

}
