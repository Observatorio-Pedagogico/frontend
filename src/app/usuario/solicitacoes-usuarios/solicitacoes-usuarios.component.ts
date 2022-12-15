import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../authenticacao/login.service';
import { Router } from '@angular/router';
import { Funcionario, EnvelopeFuncionario } from '../../shared/interfaces/funcionario';
import { FuncionarioService } from '../../disciplina/services/funcionario.service';

@Component({
  selector: 'app-solicitacoes-usuarios',
  templateUrl: './solicitacoes-usuarios.component.html',
  styleUrls: ['./solicitacoes-usuarios.component.css']
})
export class SolicitacoesUsuariosComponent implements OnInit {

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
              private funcionarioService: FuncionarioService,
              private router: Router) { }

  ngOnInit(): void {
    this.validarUsuario();
    this.montar();
  }

  validarUsuario() {
    let usuarioLogado: EnvelopeFuncionario;
    this.funcionarioService.obterUsuarioLogado().subscribe({
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
    this.loginService.getFuncionariosProfessoresEsperaCadastro(this.parametrosTabelaProfessor).subscribe({
      next:(next) => {
        this.funcionariosProfessor = next.data.content;
        this.totalElementsTabelaProfessor = next.data.totalElements;
      }
    })
  }

  montarTabelaFuncionariosCoped() {
    this.loginService.getFuncionariosCopedEsperaCadastro(this.parametrosTabelaCoped).subscribe({
      next:(next) => {
        this.funcionariosCoped = next.data.content;
        this.totalElementsTabelaCoped = next.data.totalElements;
      }
    })
  }

  ativarProfessor(id: string) {
    this.loginService.postAtivarProfessorEsperaCadastro(id).subscribe({
      next:() => {
        this.montarTabelaFuncionariosProfessor();
      }
    });
  }

  ativarFuncCoped(id: string) {
    this.loginService.postAtivarFuncionarioCopedEsperaCadastro(id).subscribe({
      next:() => {
        this.montarTabelaFuncionariosCoped();
      }
    });
  }

  desativarProfessor(id: string) {
    this.loginService.postDesativarProfessorEsperaCadastro(id).subscribe({
      next:() => {
        this.montarTabelaFuncionariosProfessor();
      }
    });
  }

  desativarFuncCoped(id: string) {
    this.loginService.postDesativarFuncionarioCopedEsperaCadastro(id).subscribe({
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
}
