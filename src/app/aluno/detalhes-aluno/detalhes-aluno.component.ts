import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/disciplina/services/aluno.service';
import { AlunoResumido } from 'src/app/shared/interfaces/aluno';
import { DashboardResponse, Dashboard, DataSets } from '../../shared/interfaces/dashboard';

@Component({
  selector: 'app-detalhes-aluno',
  templateUrl: './detalhes-aluno.component.html',
  styleUrls: ['./detalhes-aluno.component.css']
})
export class DetalhesAlunoComponent implements OnInit {

  aluno: AlunoResumido = {
    id: 0,
    matricula: '',
    nome: '',
    sexo: '',
    cre: ''
  };

  basicDataCreAluno: any;

  codigoAluno: string = '';

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.codigoAluno = this.getItem();
    this.injetarAluno(this.codigoAluno);
    this.montarGraficoCre
  }

  injetarAluno(idAluno: string) {
    this.alunoService.getAluno(idAluno).subscribe({
      next: (next) => {
        this.aluno = next.data;
      }
    })
  }

  converterObject() {
    let dataSets: DataSets[] = [];
    let background = '#ee67f3';

      dataSets.push({
        backgroundColor: background,
        label: "CRE",
        data: [Number(this.aluno.cre)]
      })
    this.basicDataCreAluno = dataSets;
  }

  montarGraficoCre() {
    this.basicDataCreAluno = this.converterObject()
  }

  getItem(): string {
    const item = sessionStorage.getItem('codigoAluno');
    return (item !== null) ? item : '';
  }

}
