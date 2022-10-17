import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesExtracaoComponent } from './detalhes-extracao.component';

describe('DetalhesExtracaoComponent', () => {
  let component: DetalhesExtracaoComponent;
  let fixture: ComponentFixture<DetalhesExtracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesExtracaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesExtracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
