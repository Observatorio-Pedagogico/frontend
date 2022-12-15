import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDisciplinaComponent } from './dashboard-disciplina.component';

describe('DashboardDisciplinaComponent', () => {
  let component: DashboardDisciplinaComponent;
  let fixture: ComponentFixture<DashboardDisciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDisciplinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
