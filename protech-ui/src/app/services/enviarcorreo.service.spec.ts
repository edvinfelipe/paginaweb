import { TestBed } from '@angular/core/testing';

import { EnviarcorreoService } from './enviarcorreo.service';

describe('EnviarcorreoService', () => {
  let service: EnviarcorreoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarcorreoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
