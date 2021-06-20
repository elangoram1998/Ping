import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { handleError } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peerObject!: Peer;
  peerID: string = "";
  mediaTracks: MediaStreamTrack[] = [];

  constructor(private http: HttpClient) { }

  connect() {
    this.peerObject = new Peer(undefined, {
      host: '/',
      port: 5001
    });
    this.peerObject.on('open', ID => {
      this.peerID = ID;
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

  checkOnline(contactID: string): Observable<boolean> {
    const params = new HttpParams().set('contactID', contactID);
    return this.http.get<boolean>(environment.checkOnline, { params }).pipe(
      catchError(handleError)
    );
  }

  get PeerObject() {
    return this.peerObject;
  }

  get PeerID() {
    return this.peerID;
  }
}
