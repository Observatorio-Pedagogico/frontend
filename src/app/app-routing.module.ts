import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CadastrarUsuarioComponent } from './authenticacao/cadastrar-usuario/cadastrar-usuario.component';
import { LoginComponent } from './authenticacao/login/login.component';
import { GuardaAutenticacaoService } from './shared/utils/services/guarda-autenticacao.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'extracoes' },
  {
    path: 'extracoes',
    loadChildren: () => import('./extracao/extracao.module').then(m => m.ExtracaoModule),
    canLoad: [GuardaAutenticacaoService]

  },
  { path: 'login', component: LoginComponent },
  { path: 'login/cadastrar', component: CadastrarUsuarioComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) { }

  private listaRotas: string[] = ['/login','/cadastrar'];

  isRotaValida(): boolean {
    const rotaSplit = this.router.url.split('/');

    const path = rotaSplit[rotaSplit.length-1];

    return !this.listaRotas.includes('/'.concat(path));
  }

}
