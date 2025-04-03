import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanShapeComponent } from './scan-shape.component';

describe('ScanShapeComponent', () => {
  let component: ScanShapeComponent;
  let fixture: ComponentFixture<ScanShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanShapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
