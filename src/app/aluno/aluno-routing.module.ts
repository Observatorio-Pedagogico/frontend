import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalhesAlunoComponent } from './detalhes-aluno/detalhes-aluno.component';

const routes: Routes = [
  { path: 'dashboard-aluno', component: DetalhesAlunoComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
