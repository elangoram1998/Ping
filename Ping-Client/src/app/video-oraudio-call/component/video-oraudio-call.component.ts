import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { PeerService } from 'src/app/services/peer.service';
import { SocketService } from 'src/app/services/socket.service';
import { Observable, Subscription } from 'rxjs';
import Peer from 'peerjs';
import { Contact } from 'src/app/interfaces/contact';
import { selectContact, selectContactByID } from 'src/app/home/selectors/contacts.selectors';
import { Account } from 'src/app/interfaces/account';
import { selectAccount } from 'src/app/auth/selectors/account.selectors';

@Component({
  selector: 'app-video-oraudio-call',
  templateUrl: './video-oraudio-call.component.html',
  styleUrls: ['./video-oraudio-call.component.css']
})
export class VideoOraudioCallComponent implements OnInit, OnDestroy {

  @ViewChild('contactgrid') contactVideoGrid!: ElementRef;
  @ViewChild('mygrid') myVideoGrid!: ElementRef;
  contactID!: string;
  action!: string;
  peerObject!: Peer;
  peerID!: string;
  myMediaStream$: Observable<MediaStream> = this.peerService.getUserMedia(true, true);
  mediaSubscription$!: Subscription;
  contact!: Contact | undefined;
  contactSubscription$!: Subscription;
  account!: Account;
  accountSubscription$!: Subscription;
  callPickedSubscription$!: Subscription;
  callDisconnectedSubcription$!: Subscription;
  connectedPeers: any = {};
  disposePeerConnection!: VoidFunction;

  constructor(private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private peerService: PeerService,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.disposePeerConnection = this.peerService.connect();
    this.load();
  }

  load(): void {
    this.route.queryParams.subscribe(params => {
      this.contactID = params.contactID;
      this.action = params.action;
    });
    this.peerObject = this.peerService.PeerObject;
    this.peerID = this.peerService.PeerID;
    this.contactSubscription$ = this.store.pipe(select(selectContactByID, { contactID: this.contactID })).subscribe(
      contact => {
        this.contact = contact;
      }
    );
    this.accountSubscription$ = this.store.pipe(select(selectAccount)).subscribe(
      account => {
        this.account = account;
      }
    );

    if (this.action === 'call') {
      this.streamMedia();
      this.socketService.mediaCall(this.contactID, this.account);
    }
    else if (this.action === 'callAnswered') {
      this.streamMedia();
      this.answerCall();
      this.peerConnection();
    }

    this.callPickedSubscription$ = this.socketService.callPicked().subscribe(
      (peerID: string) => {
        this.connectContact(peerID);
      }
    )
  }

  answerCall() {
    console.log("answer call");
    this.socketService.answerCall(this.contactID, this.peerID);
  }

  connectContact(peerID: string) {
    console.log("call friend");
    this.mediaSubscription$ = this.myMediaStream$.subscribe(
      stream => {
        const call = this.peerObject.call(peerID, stream);
        call.on('stream', mediaStream => {
          const video = document.createElement('video');
          this.addMediaStream(video, mediaStream, 'contact');
        });
        call.on('close', () => {

        });
        this.connectedPeers = call;
        console.log(this.connectedPeers);
      }
    );
  }

  peerConnection() {
    console.log("peer connection");
    this.peerObject.on('call', call => {
      this.mediaSubscription$ = this.myMediaStream$.subscribe(
        stream => {
          call.answer(stream);
        }
      );
      call.on('stream', mediaStream => {
        const video = document.createElement('video');
        this.addMediaStream(video, mediaStream, 'contact');
      });
      call.on('close', () => {

      });
      this.connectedPeers = call;
      console.log(this.connectedPeers);
    });
  }

  streamMedia() {
    this.mediaSubscription$ = this.myMediaStream$.subscribe(
      stream => {
        console.log("video started");
        console.log(stream);
        const video = document.createElement('video');
        this.addMediaStream(video, stream, 'mine');
      }
    );
  }

  addMediaStream(video: any, stream: MediaStream, type: string) {
    console.log("add media stream");
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    if (type === 'contact') {
      console.log("starting contact video");
      this.contactVideoGrid.nativeElement.append(video);
    }
    else {
      console.log("starting my video");
      this.myVideoGrid.nativeElement.append(video);
    }
  }

  ngOnDestroy(): void {
    this.mediaSubscription$.unsubscribe();
    this.contactSubscription$.unsubscribe();
    this.accountSubscription$.unsubscribe();
    this.disposePeerConnection();
  }

}
