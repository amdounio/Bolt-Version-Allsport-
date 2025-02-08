import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderCardComponent } from './placeholder-card.component';

describe('PlaceholderCardComponent', () => {
  let component: PlaceholderCardComponent;
  let fixture: ComponentFixture<PlaceholderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceholderCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceholderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
