import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-disciplina',
  templateUrl: './dashboard-disciplina.component.html',
  styleUrls: ['./dashboard-disciplina.component.css']
})
export class DashboardDisciplinaComponent implements OnInit {

  basicDataSexo: any;

  basicDataSituacaoAlunos: any;

  basicDataSituacaoDisciplina: any;

  basicDataNotasDisciplinas: any;

  basicOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.montarGraficoSexo();
    this.montarGraficoSituacaoAlunos();
    this.montarGraficoSituacaoDisciplina();
    this.montarGraficoNotasDisciplinas();
  }

  montarGraficoSexo() {
    this.basicDataSexo = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Masculino',
              backgroundColor: '#56B3FC',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Feminino',
              backgroundColor: '#F959C3',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
    };
  }

  montarGraficoSituacaoAlunos() {
    this.basicDataSituacaoAlunos = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Matriculados',
              backgroundColor: '#82DE5E',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Aprovados',
              backgroundColor: '#0035BF',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
              label: 'Reprovados',
              backgroundColor: '#F60027',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
              label: 'Trancamentos',
              backgroundColor: '#73655D',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
              label: 'Evasões',
              backgroundColor: '#35302C',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
      ]
    };
  }

  montarGraficoSituacaoDisciplina() {
    this.basicDataSituacaoDisciplina = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Média',
              data: [20, 35, 75, 79, 66, 41, 13],
              fill: false,
              borderColor: '#E4BE1D',
              tension: .4
          },
          {
              label: 'Taxa de Frequência',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#7E4680',
              tension: .4
          },
          {
              label: 'Maior Nota',
              data: [88, 75, 62, 90, 83, 70, 88],
              fill: false,
              borderColor: '#71A946',
              tension: .4
          },
          {
              label: 'Menor Nota',
              data: [15, 19, 29, 30, 22, 38, 40],
              fill: false,
              borderColor: '#B1181F',
              tension: .4
          },
      ]
    };
  }
  montarGraficoNotasDisciplinas() {
    this.basicDataNotasDisciplinas = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Avaliação 1',
              backgroundColor: '#96C1C3',
              data: [11, 20, 45, 70, 75, 64, 81]
          },
          {
              label: 'Avaliação 2',
              backgroundColor: '#F78325',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
              label: 'Avaliação 3',
              backgroundColor: '#AFCC2F',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
              label: 'Final',
              backgroundColor: '#8C030E',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
              label: 'Média',
              backgroundColor: '#02735E',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
      ]
    };
  }

}
