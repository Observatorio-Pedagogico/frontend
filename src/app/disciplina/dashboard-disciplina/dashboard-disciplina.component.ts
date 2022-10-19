import { Dashboard, DashboardResponse, DataSets } from './../../shared/interfaces/dashboard';
import { Component, OnInit } from '@angular/core';
import { DashboardDisciplinaService } from '../services/dashboard-disciplina.service';

@Component({
  selector: 'app-dashboard-disciplina',
  templateUrl: './dashboard-disciplina.component.html',
  styleUrls: ['./dashboard-disciplina.component.css']
})
export class DashboardDisciplinaComponent implements OnInit {

  dashboardSexo!: Dashboard;

  basicDataSituacaoAlunos: any;

  basicDataSituacaoDisciplina: any;

  basicDataNotasDisciplinas: any;

  basicOptions: any;

  colors: string[] = ['#FC803F', '#DE103F', '#A91DF4',
      '#1027DE', '#36E2FF', '#3F4A8D', '#61AC0B', '#1BA14D', '#EA7D81',
      '#F3A1F4', '#274C41', '#EB3F21', '#D10A03', '#49791D', '#32274B'];

  constructor(private dashboardService: DashboardDisciplinaService) { }

  ngOnInit(): void {
    this.montarGraficoSexo();
    this.montarGraficoSituacaoAlunos();
    this.montarGraficoSituacaoDisciplina();
    this.montarGraficoNotasDisciplinas();
  }

  montarGraficoSexo() {
   /*  this.basicDataSexo = {
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
    }; */
    this.dashboardService.gerarDashboardSexo().subscribe({
      next: (next) => {
        this.dashboardSexo = this.converterObject(next.data);
      }
    })


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

  converterObject(dashboardResponse: DashboardResponse): Dashboard {
    let dataSets: DataSets[] = [];
    dashboardResponse.conjuntoDados.forEach(element => {
      let background = '#73797F';
      if (element.legenda === 'FEMININO') {
        background = '#F959C3';
      } else if (element.legenda === 'MASCULINO') {
        background = '#56B3FC';
      }

      dataSets.push({
        backgroundColor: background,
        label: element.legenda,
        data: element.dados
      })

    });

    return {
      datasets: dataSets,
      labels: dashboardResponse.legendas
    }

  }

  // converterObject(dashboardResponse: DashboardResponse): Dashboard {
  //   let dataSets: DataSets[] = [];
  //   let index: number = 0;
  //   let randomColor = this.randomColor(dashboardResponse.conjuntoDados.length);
  //   dashboardResponse.conjuntoDados.forEach(element => {
  //     /* let background = '#73797F'; */
  //     let background = randomColor[index];
  //     if (element.legenda === 'FEMININO') {
  //       // background = '#F959C3';
  //       background = randomColor[index];
  //     } else if (element.legenda === 'MASCULINO') {
  //       // background = '#56B3FC';
  //       background = randomColor[index];
  //     }

  //     dataSets.push({
  //       backgroundColor: background,
  //       label: element.legenda,
  //       data: element.dados
  //     })

  //     index = index+1;
  //   });

  //   return {
  //     datasets: dataSets,
  //     labels: dashboardResponse.legendas
  //   }

  // }

  randomColor(qtdCores: number) {
    let coresAleatorias = this.shuffle(this.colors);
    let arrayAux: string[] = [];
    for (let index = 0; index < qtdCores; index++) {
      arrayAux[index] = coresAleatorias[index];
    }
    return arrayAux;
  }

  shuffle(array: string[]) {
    let i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
  }


}
