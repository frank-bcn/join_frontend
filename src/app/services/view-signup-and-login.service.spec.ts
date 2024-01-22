import { TestBed } from '@angular/core/testing';

import { ViewSignupAndLoginService } from './view-signup-and-login.service';

describe('ViewSignupAndLoginService', () => {
  let service: ViewSignupAndLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSignupAndLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
