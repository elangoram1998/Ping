import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOraudioCallComponent } from './video-oraudio-call.component';

describe('VideoOraudioCallComponent', () => {
  let component: VideoOraudioCallComponent;
  let fixture: ComponentFixture<VideoOraudioCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoOraudioCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoOraudioCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
