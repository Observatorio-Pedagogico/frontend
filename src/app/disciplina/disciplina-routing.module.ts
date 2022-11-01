import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardDisciplinaComponent } from '../disciplina/dashboard-disciplina/dashboard-disciplina.component';
import { DetalhesDisciplinaComponent } from './detalhes-disciplina/detalhes-disciplina.component';

const routes: Routes = [
  { path: 'dashboard-geral', component: DashboardDisciplinaComponent },
  { path: 'dashboard-disciplina', component: DetalhesDisciplinaComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplinaRoutingModule { }
