import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWishComponent } from './delete-wish.component';

describe('DeleteWishComponent', () => {
  let component: DeleteWishComponent;
  let fixture: ComponentFixture<DeleteWishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
