import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { SolicitacoesUsuariosComponent } from './solicitacoes-usuarios/solicitacoes-usuarios.component';

const routes: Routes = [
  { path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent },
  { path: 'solicitacoes-usuarios', component: SolicitacoesUsuariosComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
