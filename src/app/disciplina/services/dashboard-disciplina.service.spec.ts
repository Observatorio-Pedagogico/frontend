/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardDisciplinaService } from './dashboard-disciplina.service';

describe('Service: DashboardDisciplina', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardDisciplinaService]
    });
  });

  it('should ...', inject([DashboardDisciplinaService], (service: DashboardDisciplinaService) => {
    expect(service).toBeTruthy();
  }));
});
