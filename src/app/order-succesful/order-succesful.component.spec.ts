import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccesfulComponent } from './order-succesful.component';

describe('OrderSuccesfulComponent', () => {
  let component: OrderSuccesfulComponent;
  let fixture: ComponentFixture<OrderSuccesfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSuccesfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccesfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
