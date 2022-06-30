import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'extracoes' },
  {
    path: 'extracoes',
    loadChildren: () => import('./extracao/extracao.module').then(m => m.ExtracaoModule)

  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
