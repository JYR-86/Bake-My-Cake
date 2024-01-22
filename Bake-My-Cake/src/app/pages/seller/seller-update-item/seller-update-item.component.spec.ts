import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateItemComponent } from './seller-update-item.component';

describe('SellerUpdateItemComponent', () => {
  let component: SellerUpdateItemComponent;
  let fixture: ComponentFixture<SellerUpdateItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerUpdateItemComponent]
    });
    fixture = TestBed.createComponent(SellerUpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
