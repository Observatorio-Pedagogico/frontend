import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtracaoRoutingModule } from './extracao-routing.module';
import { CadastroExtracaoComponent } from './cadastro-extracao/cadastro-extracao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ListagemExtracoesComponent } from './listagem-extracoes/listagem-extracoes.component';
import { DetalhesExtracaoComponent } from './detalhes-extracao/detalhes-extracao.component';


@NgModule({
  declarations: [
    CadastroExtracaoComponent,
    ListagemExtracoesComponent,
    DetalhesExtracaoComponent
  ],
  imports: [
    CommonModule,
    ExtracaoRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class ExtracaoModule { }
