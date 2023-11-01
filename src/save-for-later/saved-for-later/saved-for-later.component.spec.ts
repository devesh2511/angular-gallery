import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedForLaterComponent } from './saved-for-later.component';

describe('SavedForLaterComponent', () => {
  let component: SavedForLaterComponent;
  let fixture: ComponentFixture<SavedForLaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedForLaterComponent]
    });
    fixture = TestBed.createComponent(SavedForLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
