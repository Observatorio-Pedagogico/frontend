import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroExtracaoComponent } from './cadastro-extracao/cadastro-extracao.component';
import { ListagemExtracoesComponent } from './listagem-extracoes/listagem-extracoes.component';
import { ListagemStatusEnvioComponent } from './listagem-status-envio/listagem-status-envio.component';

const routes: Routes = [

  { path: '', component: ListagemExtracoesComponent },
  { path: 'nova-extracao', component: CadastroExtracaoComponent },
  { path: 'listagem-envio', component: ListagemStatusEnvioComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtracaoRoutingModule { }
