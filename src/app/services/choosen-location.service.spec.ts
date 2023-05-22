import { TestBed } from '@angular/core/testing';

import { ChoosenLocationService } from './choosen-location.service';

describe('ChoosenLocationService', () => {
  let service: ChoosenLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoosenLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
