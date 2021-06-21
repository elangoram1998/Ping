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
  sendMyStream$: Observable<MediaStream> = this.peerService.getUserMedia(true, true);
  contactMediaSubscription$: Subscription = new Subscription;
  contact!: Contact | undefined;
  contactSubscription$!: Subscription;
  account!: Account;
  accountSubscription$!: Subscription;
  callPickedSubscription$!: Subscription;
  callDisconnectedSubcription$!: Subscription;
  callNotRepondedSubscription$!: Subscription;
  connectedPeers: any = {};
  myvideoTracks: MediaStreamTrack[] = [];
  contactVideoTracks: MediaStreamTrack[] = [];
  isPeerConnected: boolean = false;

  constructor(private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private peerService: PeerService,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.route.queryParams.subscribe(params => {
      this.contactID = params.contactID;
      this.action = params.action;
    });
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
    this.peerObject = new Peer(undefined, {
      host: '/',
      port: 5001
    });
    this.peerObject.on('open', ID => {
      this.peerID = ID;
      if (this.action === 'call') {
        this.streamMedia();
        this.socketService.mediaCall(this.contactID, this.account);
      }
      else if (this.action === 'callAnswered') {
        this.streamMedia();
        this.answerCall();
        this.peerConnection();
      }
    });

    this.callPickedSubscription$ = this.socketService.callPicked().subscribe(
      (peerID: string) => {
        this.connectContact(peerID);
      }
    );

    this.callDisconnectedSubcription$ = this.socketService.callDisconnected().subscribe(
      (peerID: string) => {
        this.connectedPeers.close();
        this.myvideoTracks.forEach(track => track.stop());
        this.contactVideoTracks.forEach(track => track.stop());
        this.location.back();
      }
    );

    this.callNotRepondedSubscription$ = this.socketService.notResponded().subscribe(
      (contactID: string) => {
        this.disconnectCall();
      }
    );
  }

  answerCall() {
    this.socketService.answerCall(this.contactID, this.peerID);
  }

  connectContact(peerID: string) {
    this.contactMediaSubscription$ = this.sendMyStream$.subscribe(
      stream => {
        this.contactVideoTracks = stream.getTracks();
        const call = this.peerObject.call(peerID, stream);
        const video = document.createElement('video');
        call.on('stream', mediaStream => {
          this.addMediaStream(video, mediaStream, 'contact');
        });
        call.on('close', () => {
          this.peerObject.disconnect();
          video.remove();
        });
        this.connectedPeers = call;
        this.isPeerConnected = true;
        console.log(this.connectedPeers);
      }
    );
  }

  peerConnection() {
    this.peerObject.on('call', call => {
      this.contactMediaSubscription$ = this.sendMyStream$.subscribe(
        stream => {
          this.contactVideoTracks = stream.getTracks();
          call.answer(stream);
          const video = document.createElement('video');
          call.on('stream', mediaStream => {
            this.addMediaStream(video, mediaStream, 'contact');
          });
          call.on('close', () => {
            this.peerObject.disconnect();
            video.remove();
          });
          this.connectedPeers = call;
          this.isPeerConnected = true;
          console.log(this.connectedPeers);
        }
      );
    });
  }

  streamMedia() {
    this.mediaSubscription$ = this.myMediaStream$.subscribe(
      stream => {
        this.myvideoTracks = stream.getTracks();
        const video = document.createElement('video');
        this.addMediaStream(video, stream, 'mine');
      }
    );
  }

  addMediaStream(video: any, stream: MediaStream, type: string) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    if (type === 'contact') {
      this.contactVideoGrid.nativeElement.append(video);
    }
    else {
      this.myVideoGrid.nativeElement.append(video);
    }
  }

  disconnectCall() {
    if (this.isPeerConnected) {
      this.socketService.disconnectCall(this.contactID, this.peerID);
      this.myvideoTracks.forEach(track => track.stop());
      this.contactVideoTracks.forEach(track => track.stop());
      this.connectedPeers.close();
      this.peerObject.destroy();
      this.location.back();
    }
    else {
      this.socketService.cancelMediaCall(this.contactID, this.account);
      this.cancelMediaCall();
    }
  }

  cancelMediaCall() {
    this.myvideoTracks.forEach(track => track.stop());
    this.peerObject.destroy();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.isPeerConnected = false;
    this.mediaSubscription$.unsubscribe();
    this.contactSubscription$.unsubscribe();
    this.accountSubscription$.unsubscribe();
    this.contactMediaSubscription$.unsubscribe();
    this.callPickedSubscription$.unsubscribe();
    this.callDisconnectedSubcription$.unsubscribe();
    this.callNotRepondedSubscription$.unsubscribe();
    this.peerObject.destroy();
  }

}
