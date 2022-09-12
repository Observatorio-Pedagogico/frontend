import { TestBed } from '@angular/core/testing';

import { ExtracaoService } from './extracao.service';

describe('ExtracaoService', () => {
  let service: ExtracaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtracaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
