import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteSportsComponent } from './favorite-sports.component';

describe('FavoriteSportsComponent', () => {
  let component: FavoriteSportsComponent;
  let fixture: ComponentFixture<FavoriteSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteSportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
