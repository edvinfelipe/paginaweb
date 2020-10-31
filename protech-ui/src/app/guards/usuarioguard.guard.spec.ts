import { TestBed } from '@angular/core/testing';

import { UsuarioguardGuard } from './usuarioguard.guard';

describe('UsuarioguardGuard', () => {
  let guard: UsuarioguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
