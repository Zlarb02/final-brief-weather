import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDayComponent } from './selected-day.component';

describe('SelectedDayComponent', () => {
  let component: SelectedDayComponent;
  let fixture: ComponentFixture<SelectedDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
