import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  mediaTracks: MediaStreamTrack[] = [];

  constructor() { }

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
