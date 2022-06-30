import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemExtracoesComponent } from './listagem-extracoes.component';

describe('ListagemExtracoesComponent', () => {
  let component: ListagemExtracoesComponent;
  let fixture: ComponentFixture<ListagemExtracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemExtracoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemExtracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
