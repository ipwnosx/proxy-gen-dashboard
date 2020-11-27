import { TestBed } from '@angular/core/testing';

import { PnpApiService } from './pnp-api.service';

describe('PnpApiService', () => {
  let service: PnpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PnpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
