import { TestBed } from '@angular/core/testing';

import { FiltrobusquedaService } from './filtrobusqueda.service';

describe('FiltrobusquedaService', () => {
  let service: FiltrobusquedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrobusquedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
