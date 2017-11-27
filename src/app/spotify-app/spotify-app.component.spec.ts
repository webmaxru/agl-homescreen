import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyAppComponent } from './spotify-app.component';

describe('SpotifyAppComponent', () => {
  let component: SpotifyAppComponent;
  let fixture: ComponentFixture<SpotifyAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
