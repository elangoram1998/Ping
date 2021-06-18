import { Injectable } from '@angular/core';
import * as Peer from 'peerjs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peerObject!: Peer;
  peerID: string = "";
  peerSubject = new BehaviorSubject("");
  mediaTracks: MediaStreamTrack[] = [];

  constructor() { }

  connect() {
    this.peerObject = new Peer(undefined, {
      host: '/',
      port: 5001
    });
    this.peerObject.on('open', ID => {
      this.peerID = ID;
      this.peerSubject.next(ID);
      console.log("Peer ID: " + this.peerID);
    });
    localStorage.setItem("peer", "loaded");
    return () => {
      this.peerObject.destroy();
    }
  }

  getUserMedia(audio: boolean, video: boolean) {
    return Observable.create((observer: any) => {
      navigator.mediaDevices.getUserMedia({ audio, video }).then((stream: MediaStream) => {
        this.mediaTracks = stream.getTracks();
        observer.next(stream);
      }).catch((error: MediaStreamError) => {
        observer.error(error);
      });
      return () => {
        this.mediaTracks.forEach(track => track.stop());
      }
    });
  }
}
