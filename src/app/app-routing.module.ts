import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'extracoes' },
  {
    path: 'extracoes',
    loadChildren: () => import('./extracao/extracao.module').then(m => m.ExtracaoModule)

  },
  { path: 'login', component: LoginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
