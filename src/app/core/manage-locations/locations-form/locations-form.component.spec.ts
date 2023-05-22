import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsFormComponent } from './locations-form.component';

describe('LocationsFormComponent', () => {
  let component: LocationsFormComponent;
  let fixture: ComponentFixture<LocationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
