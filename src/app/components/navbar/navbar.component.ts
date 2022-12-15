import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { LoginService } from '../../authenticacao/login.service';
import { EnvelopeFuncionario, TipoFuncionario } from '../../shared/interfaces/funcionario';
import { FuncionarioService } from '../../disciplina/services/funcionario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
[x: string]: any;

  sideActive: boolean = false;

  itemsGerenciamento!: MenuItem[];

  envelopeFuncionario: EnvelopeFuncionario = {
    funcionario: {
      id: 0,
      email: '',
      matricula: '',
      nome: '',
      sexo: '',
      ativo: false
    },
    tipoFuncionario: TipoFuncionario.FUNCIONARIO_COPED
  };

  constructor(private router: Router,
              private funcionarioService: FuncionarioService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.funcionarioService.obterUsuarioLogado().subscribe(response => {
      this.envelopeFuncionario = response.data;
    });
    this.montarItemsGerenciamento();
  }

  logout() {
    sessionStorage.removeItem("logado");
    sessionStorage.removeItem("token");
    this.router.navigate(['login']);
  }

  montarItemsGerenciamento(){
    this.itemsGerenciamento = [
      {label: 'Gerenciamento de Usuários', icon: 'pi pi-check', command: () => {
        this.navigatePageGerenciarUsuarios();
      }},
      {label: 'Solicitações de Usuários', icon: 'pi pi-check', command: () => {
        this.navigatePageSolicitacoesUsuarios();
      }},
    ];
  }

  navigatePageDashboardDisciplina() {
    this.router.navigate(['dashboard-geral']);
    (this.getElementByXpath('/html/body/app-root/app-navbar/mat-toolbar/a') as HTMLButtonElement).click();
  }

  navigatePageExtracoes() {
    this.router.navigate(['/']);
    (this.getElementByXpath('/html/body/app-root/app-navbar/mat-toolbar/a') as HTMLButtonElement).click();
  }

  navigatePageGerenciarUsuarios() {
    this.router.navigate(['gerenciar-usuarios']);
    (this.getElementByXpath('/html/body/app-root/app-navbar/mat-toolbar/a') as HTMLButtonElement).click();
  }

  navigatePageSolicitacoesUsuarios() {
    this.router.navigate(['solicitacoes-usuarios']);
    (this.getElementByXpath('/html/body/app-root/app-navbar/mat-toolbar/a') as HTMLButtonElement).click();
  }

  getElementByXpath(path: string) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  isFuncionarioCoped() {
    return this.envelopeFuncionario.tipoFuncionario === 'COPED';
  }

}
