import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  disposeSocketConnection!: VoidFunction;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.disposeSocketConnection = this.socketService.connect();
  }

  ngOnDestroy(): void {
    this.disposeSocketConnection();
  }

}
