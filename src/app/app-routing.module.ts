import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
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
export class AppRoutingModule {

  constructor(private router: Router) { }

  private listaRotas: string[] = ['/login'];

  isRotaValida(): boolean {
    const rotaSplit = this.router.url.split('/');
    const path = rotaSplit[rotaSplit.length-1];
    return !this.listaRotas.includes('/'.concat(path));
  }

}
