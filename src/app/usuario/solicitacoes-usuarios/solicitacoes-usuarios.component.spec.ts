import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesUsuariosComponent } from './solicitacoes-usuarios.component';

describe('SolicitacoesUsuariosComponent', () => {
  let component: SolicitacoesUsuariosComponent;
  let fixture: ComponentFixture<SolicitacoesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacoesUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
