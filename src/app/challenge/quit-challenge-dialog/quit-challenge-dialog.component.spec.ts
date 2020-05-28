import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitChallengeDialogComponent } from './quit-challenge-dialog.component';

describe('QuitChallengeDialogComponent', () => {
  let component: QuitChallengeDialogComponent;
  let fixture: ComponentFixture<QuitChallengeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitChallengeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitChallengeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
