import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { EnvelopeFuncionario, Funcionario, TipoFuncionario } from '../../shared/interfaces/login';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sideActive: boolean = false;

  envelopeFuncionario: EnvelopeFuncionario = {
    funcionario: {
      email: '',
      matricula: '',
      nome: '',
      sexo: ''
    },
    tipoFuncionario: TipoFuncionario.FUNCIONARIO_COPED
  };

  constructor(private router: Router, private navBarService: NavbarService) { }

  ngOnInit(): void {
    this.navBarService.setProfile().subscribe(response => {
      this.envelopeFuncionario = response.data;
    });
  }

  logout() {
    sessionStorage.removeItem("logado");
    sessionStorage.removeItem("token");
    this.router.navigate(['login']);
  }

  navigatePageDashboardDisciplina() {
    this.router.navigate(['dashboard-disciplina']);
    (this.getElementByXpath('/html/body/app-root/app-navbar/mat-toolbar/a') as HTMLButtonElement).click();
  }

  getElementByXpath(path: string) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

}
