import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { PeerService } from 'src/app/services/peer.service';
import { SocketService } from 'src/app/services/socket.service';
import { Observable, Subscription } from 'rxjs';
import * as Peer from 'peerjs';

@Component({
  selector: 'app-video-oraudio-call',
  templateUrl: './video-oraudio-call.component.html',
  styleUrls: ['./video-oraudio-call.component.css']
})
export class VideoOraudioCallComponent implements OnInit, OnDestroy {

  contactID!: string;
  action!: string;

  constructor(private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private peerService: PeerService,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.contactID = params.contactID;
      this.action = params.action;
    });
    console.log(this.peerService.peerObject);
    console.log(this.peerService.peerID);
  }

  ngOnDestroy(): void {

  }

}
