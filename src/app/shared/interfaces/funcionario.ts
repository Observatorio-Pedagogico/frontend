import { Directive, Input, OnInit } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { firstValueFrom } from 'rxjs';

import { DisciplinaService } from '../../disciplina/services/disciplina.service';
import { FuncionarioService } from '../../disciplina/services/funcionario.service';
import { DisciplinaResumidoResponse } from './disciplina';


export interface Funcionario {
  id: number;
  matricula: string;
  email: string;
  nome: string;
  sexo: string;
  ativo: boolean;
}

export interface EnvelopeFuncionario {
  funcionario: Funcionario;
  tipoFuncionario: TipoFuncionario;
}

export enum TipoFuncionario {
  FUNCIONARIO_COPED = "COPED",
  PROFESSOR = "Professor"
}

export interface UpdateProfessorDisciplinaRequest {
  idProfessor: number;
  codigos: string[];
}

export interface ProfessorResponse {
  disciplinas: DisciplinaResumidoResponse[];
}

@Directive({
  selector: '[app-mat-option]',
})
export class MatOptionPersonalizado implements OnInit {

  selected = false;
  @Input() idProfessor = 0;
  @Input() codigoDisciplina = ''

  constructor(private option: MatOption, private funcionarioService: FuncionarioService, private disciplinaService: DisciplinaService){}

  ngOnInit() {
    this.isSelected();

  }

  getSelect(): void {
    this.option.select();
  }

  async isSelected(): Promise<void> {
    await firstValueFrom(this.funcionarioService.getProfessor(this.idProfessor))
      .then(response => {
        let selected = response.data.disciplinas.find(disciplinaProfessor => disciplinaProfessor.codigo === this.codigoDisciplina) !== undefined;
        if (selected) {
           this.option.select();
        }
      });

  }
}
