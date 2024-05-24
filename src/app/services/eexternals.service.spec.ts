import { TestBed } from '@angular/core/testing';

import { EexternalsService } from './eexternals.service';

describe('EexternalsService', () => {
  let service: EexternalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EexternalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
