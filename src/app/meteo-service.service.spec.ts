import { TestBed } from '@angular/core/testing';

import { MeteoServiceService } from './meteo-service.service';

describe('MeteoServiceService', () => {
  let service: MeteoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeteoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
