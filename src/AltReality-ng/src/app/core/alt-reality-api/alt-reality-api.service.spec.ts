import { TestBed } from '@angular/core/testing';

import { AltRealityApiService } from './alt-reality-api.service';

describe('AltRealityApiService', () => {
  let service: AltRealityApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltRealityApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
