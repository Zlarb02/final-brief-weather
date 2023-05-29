import { TestBed } from '@angular/core/testing';

import { SiblingService } from './sibling.service';

describe('SiblingService', () => {
  let service: SiblingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiblingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
