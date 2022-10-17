import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemStatusEnvioComponent } from './listagem-status-envio.component';

describe('ListagemStatusEnvioComponent', () => {
  let component: ListagemStatusEnvioComponent;
  let fixture: ComponentFixture<ListagemStatusEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemStatusEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemStatusEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
