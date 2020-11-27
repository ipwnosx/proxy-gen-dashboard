import { TestBed } from '@angular/core/testing';

import { SupportedCountriesService } from './supported-countries.service';

describe('SupportedCountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupportedCountriesService = TestBed.get(SupportedCountriesService);
    expect(service).toBeTruthy();
  });
});
