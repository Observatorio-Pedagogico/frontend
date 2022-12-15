import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { LoginService } from '../../authenticacao/login.service';
import { DisciplinaService } from '../../disciplina/services/disciplina.service';
import { FuncionarioService } from '../../disciplina/services/funcionario.service';
import { DisciplinaResumido } from '../../shared/interfaces/disciplina';
import {
  EnvelopeFuncionario,
  Funcionario,
  ProfessorResponse,
  UpdateProfessorDisciplinaRequest,
} from '../../shared/interfaces/funcionario';

export interface DisciplinaEstado {
  selected: boolean;
  disciplina: DisciplinaResumido;
}

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css']
})
export class GerenciarUsuariosComponent implements OnInit, AfterContentInit {

  funcionariosCoped: Funcionario[] = [];

  funcionariosProfessor: Funcionario[] = [];

  disciplinasDisponiveis: DisciplinaResumido[] = [];

  disciplinasEstado: DisciplinaEstado[] = [];

  pageSizeTabelaProfessor: number = 5;

  pageIndexTabelaProfessor: number = 0;

  totalElementsTabelaProfessor: number = 0;

  parametrosTabelaProfessor: string = `?page=${this.pageIndexTabelaProfessor}` +
    `&size=${this.pageSizeTabelaProfessor}` +
    `&sort=nome,asc`;
  pageSizeTabelaCoped: number = 5;

  pageIndexTabelaCoped: number = 0;

  totalElementsTabelaCoped: number = 0;

  parametrosTabelaCoped: string = `?page=${this.pageIndexTabelaCoped}` +
    `&size=${this.pageSizeTabelaCoped}` +
    `&sort=nome,asc`;

  constructor(private funcionarioService: FuncionarioService,
    private loginService: LoginService,
    private disciplinaService: DisciplinaService,
    private router: Router) { }

  ngAfterContentInit(): void {
    this.montarListaDisciplinasEstado();

  }

  async ngOnInit(): Promise<void> {
    this.validarUsuario();
    await this.montar();
    this.montarListaDisciplinasEstado();
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

  async montar() {
    await Promise.all([
      this.montarListaDisciplinasDisponiveis(),
      this.montarTabelaFuncionariosProfessor(),
      this.montarTabelaFuncionariosCoped(),
    ]);
    // await this.montarListaDisciplinasEstado();

  }

  montarListaDisciplinasDisponiveis() {
    this.disciplinaService.getBuscarDisciplinasResumidoIgnorandoPeriodo().subscribe({
      next: (value) => {
        this.disciplinasDisponiveis = value.data;
      },
    })
  }

  montarListaDisciplinasEstado() {
    this.funcionariosProfessor.forEach(professor => {
      this.funcionarioService.getProfessor(professor.id).subscribe({
        next: (value) => {
          this.disciplinasDisponiveis.forEach(disc => {
            this.disciplinasEstado.push({
              selected: value.data.disciplinas.find(disciplinaProfessor => disciplinaProfessor.codigo === disc.codigo) !== undefined,
              disciplina: disc
            })
          });

        },
      });

    })
  }

  async montarTabelaFuncionariosProfessor() {
    await firstValueFrom(this.loginService.getFuncionariosProfessores(this.parametrosTabelaProfessor)).then(professor => {
      this.funcionariosProfessor = professor.data.content;
      this.totalElementsTabelaProfessor = professor.data.totalElements;

    });
  }

  montarTabelaFuncionariosCoped() {
    this.loginService.getFuncionariosCoped(this.parametrosTabelaCoped).subscribe({
      next: (next) => {
        this.funcionariosCoped = next.data.content;
        this.totalElementsTabelaCoped = next.data.totalElements;
      }
    })
  }

  ativarProfessor(id: string) {
    this.loginService.postAtivarProfessor(id).subscribe({
      next: () => {
        this.montarTabelaFuncionariosProfessor();
      }
    });
  }

  ativarFuncCoped(id: string) {
    this.loginService.postAtivarFuncionarioCoped(id).subscribe({
      next: () => {
        this.montarTabelaFuncionariosCoped();
      }
    });
  }

  desativarProfessor(id: string) {
    this.loginService.postDesativarProfessor(id).subscribe({
      next: () => {
        this.montarTabelaFuncionariosProfessor();
      }
    });
  }

  desativarFuncCoped(id: string) {
    this.loginService.postDesativarFuncionarioCoped(id).subscribe({
      next: () => {
        this.montarTabelaFuncionariosCoped();
      }
    });
  }

  montarPaginacaoProfessores(event: any) {
    this.parametrosTabelaProfessor = `?page=${event.page}` +
      `&size=${event.rows}` +
      `&sort=nome,asc`;
    this.pageSizeTabelaProfessor = event.rows;
    this.pageIndexTabelaProfessor = event.page;
    this.montarTabelaFuncionariosProfessor();
  }

  montarPaginacaoCoped(event: any) {
    this.parametrosTabelaCoped = `?page=${event.page}` +
      `&size=${event.rows}` +
      `&sort=nome,asc`;
    this.pageSizeTabelaCoped = event.rows;
    this.pageIndexTabelaCoped = event.page;
    this.montarTabelaFuncionariosCoped();
  }

  onSlideToggle(event: MatSlideToggleChange, id: string, tipoFuncionario: string) {
    if (tipoFuncionario === 'PROFESSOR') {
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

  checkedDisciplina(event: any, idProfessor: number): void {
    const updateProfessor: UpdateProfessorDisciplinaRequest = {
      codigos: [event.source.value],
      idProfessor: idProfessor
    }

    if (event.source.selected) {
      this.funcionarioService.adicionarDisciplinaAoProfessor(updateProfessor).subscribe();
    } else {
      this.funcionarioService.removerDisciplinaAoProfessor(updateProfessor).subscribe();
    }
  }

  isContemDisciplinaDoProfessor(idProfessor: number, codigoDisciplina: string): boolean {
    return false;

    //  return professor.disciplinas.find(disc => disc.codigo === codigoDisciplina) !== undefined;
  }

  private obterProfessorById(idProfessor: number): ProfessorResponse {
    let professor: ProfessorResponse = {
      disciplinas: []
    };

    this.funcionarioService.getProfessor(idProfessor).subscribe({
      next: (value) => {
        professor = value.data;
      },
    });
    return professor;
  }

  getElementByXpath(path: string) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

}
