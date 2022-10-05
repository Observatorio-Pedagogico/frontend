import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroExtracaoComponent } from './cadastro-extracao.component';

describe('CadastroExtracaoComponent', () => {
  let component: CadastroExtracaoComponent;
  let fixture: ComponentFixture<CadastroExtracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroExtracaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroExtracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
