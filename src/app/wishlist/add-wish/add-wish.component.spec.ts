import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWishComponent } from './add-wish.component';

describe('AddWishComponent', () => {
  let component: AddWishComponent;
  let fixture: ComponentFixture<AddWishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
