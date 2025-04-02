import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleCardComponent } from './puzzle-card.component';

describe('PuzzleCardComponent', () => {
  let component: PuzzleCardComponent;
  let fixture: ComponentFixture<PuzzleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
