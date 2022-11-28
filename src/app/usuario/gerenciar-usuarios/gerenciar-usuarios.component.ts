import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

import { LoginService } from '../../authenticacao/login.service';
import { EnvelopeFuncionario, Funcionario, TipoFuncionario } from '../../shared/interfaces/login';

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css']
})
export class GerenciarUsuariosComponent implements OnInit {

  funcionariosCoped: Funcionario[] = [];

  funcionariosProfessor: Funcionario[] = [];

  pageSizeTabelaProfessor: number = 5;

  pageIndexTabelaProfessor: number = 0;

  totalElementsTabelaProfessor: number = 0;

  parametrosTabelaProfessor: string = `?page=${this.pageIndexTabelaProfessor}`+
                                         `&size=${this.pageSizeTabelaProfessor}`+
                                         `&sort=nome,asc`;
  pageSizeTabelaCoped: number = 5;

  pageIndexTabelaCoped: number = 0;

  totalElementsTabelaCoped: number = 0;

  parametrosTabelaCoped: string = `?page=${this.pageIndexTabelaCoped}`+
                                         `&size=${this.pageSizeTabelaCoped}`+
                                         `&sort=nome,asc`;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.validarUsuario();
    this.montar();
  }

  validarUsuario() {
    let usuarioLogado: EnvelopeFuncionario;
    this.loginService.obterUsuarioLogado().subscribe({
      next: (value) => {
        usuarioLogado = value.data;
      },
      complete: () => {
        if (usuarioLogado.tipoFuncionario.toString() !== 'FUNCIONARIO_COPED') {
          this.router.navigate(['/']);
        }
      },
    })
  }

  montar() {
    this.montarTabelaFuncionariosCoped();
    this.montarTabelaFuncionariosProfessor();
  }

  montarTabelaFuncionariosProfessor() {
    this.loginService.getFuncionariosProfessores(this.parametrosTabelaProfessor).subscribe({
      next:(next) => {
        this.funcionariosProfessor = next.data.content;
        this.totalElementsTabelaProfessor = next.data.totalElements;
      }
    })
  }

  montarTabelaFuncionariosCoped() {
    this.loginService.getFuncionariosCoped(this.parametrosTabelaCoped).subscribe({
      next:(next) => {
        this.funcionariosCoped = next.data.content;
        this.totalElementsTabelaCoped = next.data.totalElements;
      }
    })
  }

  ativarProfessor(id: string) {
    this.loginService.postAtivarProfessor(id).subscribe({
      next:() => {
        this.montarTabelaFuncionariosProfessor();
      }
    });
  }

  ativarFuncCoped(id: string) {
    this.loginService.postAtivarFuncionarioCoped(id).subscribe({
      next:() => {
        this.montarTabelaFuncionariosCoped();
      }
    });
  }

  desativarProfessor(id: string) {
    this.loginService.postDesativarProfessor(id).subscribe({
      next:() => {
        this.montarTabelaFuncionariosProfessor();
      }
    });
  }

  desativarFuncCoped(id: string) {
    this.loginService.postDesativarFuncionarioCoped(id).subscribe({
      next:() => {
        this.montarTabelaFuncionariosCoped();
      }
    });
  }

  montarPaginacaoProfessores(event: any) {
    this.parametrosTabelaProfessor = `?page=${event.page}`+
                             `&size=${event.rows}`+
                             `&sort=nome,asc`;
    this.pageSizeTabelaProfessor = event.rows;
    this.pageIndexTabelaProfessor = event.page;
    this.montarTabelaFuncionariosProfessor();
  }

  montarPaginacaoCoped(event: any) {
    this.parametrosTabelaCoped = `?page=${event.page}`+
                             `&size=${event.rows}`+
                             `&sort=nome,asc`;
    this.pageSizeTabelaCoped = event.rows;
    this.pageIndexTabelaCoped = event.page;
    this.montarTabelaFuncionariosCoped();
  }

  onSlideToggle(event: MatSlideToggleChange, id: string, tipoFuncionario: string) {

    if (tipoFuncionario === 'PROFESSOR' ) {
      if (event.checked) {
        this.loginService.postAtivarProfessor(id).subscribe();
        return;
      }
      this.loginService.postDesativarProfessor(id).subscribe();
    } else {
      if (event.checked) {
        this.loginService.postAtivarFuncionarioCoped(id).subscribe();
        return;
      }
      this.loginService.postDesativarFuncionarioCoped(id).subscribe();
    }
  }

}
