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

  private subscription: Subscription = new Subscription;
  notification: boolean = false;
  caller!: Account;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.socketService.gettingCall().subscribe(
      (caller: Account) => {
        this.notification = true;
        this.caller = caller;
        setTimeout(() => {
          this.notification = false;
        }, 30000)
      }
    )
  }

  answerCall() {
    this.router.navigate(['videoOraudioCall'], { queryParams: { contactID: this.caller._id, action: 'callAnswered' } })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
