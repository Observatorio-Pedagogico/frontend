import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroExtracaoComponent } from './cadastro-extracao/cadastro-extracao.component';
import { ListagemExtracoesComponent } from './listagem-extracoes/listagem-extracoes.component';

const routes: Routes = [

  { path: '', component: ListagemExtracoesComponent },
  { path: 'nova-extracao', component: CadastroExtracaoComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtracaoRoutingModule { }
