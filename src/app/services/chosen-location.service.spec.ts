import { TestBed } from '@angular/core/testing';

import { ChosenLocationService } from './chosen-location.service';

describe('ChosenLocationService', () => {
  let service: ChosenLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChosenLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
