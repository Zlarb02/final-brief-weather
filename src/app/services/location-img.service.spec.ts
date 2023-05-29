import { TestBed } from '@angular/core/testing';

import { LocationImgService } from './location-img.service';

describe('LocationImgService', () => {
  let service: LocationImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
