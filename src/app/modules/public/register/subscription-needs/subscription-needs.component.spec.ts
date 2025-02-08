import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionNeedsComponent } from './subscription-needs.component';

describe('SubscriptionNeedsComponent', () => {
  let component: SubscriptionNeedsComponent;
  let fixture: ComponentFixture<SubscriptionNeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriptionNeedsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
