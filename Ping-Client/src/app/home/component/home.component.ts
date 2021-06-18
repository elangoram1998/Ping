import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { selectAccount } from 'src/app/auth/selectors/account.selectors';
import { Account } from 'src/app/interfaces/account';
import { Contact } from 'src/app/interfaces/contact';
import { Search } from 'src/app/interfaces/search';
import { AppState } from 'src/app/reducers';
import { HomeService } from 'src/app/services/home.service';
import { PeerService } from 'src/app/services/peer.service';
import { SocketService } from 'src/app/services/socket.service';
import { selectAllContacts } from '../selectors/contacts.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('search') search!: ElementRef;
  contacts$!: Observable<Contact[]>;
  searchResult$!: Observable<Search[]>;
  account!: Account;
  accountSubcription$!: Subscription;
  disposeSocketConnection!: VoidFunction;
  disposePeerConnection!: VoidFunction;

  constructor(private store: Store<AppState>,
    private homeService: HomeService,
    private router: Router,
    private socketService: SocketService,
    private peerService: PeerService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.contacts$ = this.store.pipe(select(selectAllContacts));

    this.accountSubcription$ = this.store.pipe(select(selectAccount)).subscribe(
      account => {
        this.account = account;
      }
    );

    this.disposeSocketConnection = this.socketService.connect();
    this.disposePeerConnection = this.peerService.connect();
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup').pipe(
      debounceTime(300),
      map(res => res)
    ).subscribe(
      () => {
        const value = this.search.nativeElement.value;
        if (value !== '') {
          this.searchResult$ = this.homeService.searchUsers(value);
        }
      }
    )
  }

  addContact(account: Search) {
    this.homeService.addContact(account._id).subscribe();
  }

  goToChat(roomID: string, contactID: string) {
    this.router.navigate(['chat'], { queryParams: { roomID, contactID } });
  }

  ngOnDestroy(): void {
    this.accountSubcription$.unsubscribe();
  }

}
