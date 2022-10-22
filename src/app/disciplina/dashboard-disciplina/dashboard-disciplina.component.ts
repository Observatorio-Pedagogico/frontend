import { DisciplinaResumido } from './../../shared/interfaces/disciplina';
import { Dashboard, DashboardResponse, DataSets } from './../../shared/interfaces/dashboard';
import { Component, OnInit } from '@angular/core';
import { DashboardDisciplinaService } from '../services/dashboard-disciplina.service';
import { FormControl } from '@angular/forms';
import { DisciplinaService } from '../services/disciplina.service';
import { ConjuntoDadosResponse } from '../../shared/interfaces/dashboard';

@Component({
  selector: 'app-dashboard-disciplina',
  templateUrl: './dashboard-disciplina.component.html',
  styleUrls: ['./dashboard-disciplina.component.css']
})
export class DashboardDisciplinaComponent implements OnInit {

  loading: boolean = true;

  dashboardSexo!: Dashboard;

  basicDataSituacaoAlunos: any;

  basicDataSituacaoDisciplina: any;

  basicDataNotasDisciplinas: any;

  basicOptions: any;

  formFiltro = new FormControl('');

  periodos: string[] = [];

  disciplinasResumidas: DisciplinaResumido[] = [];

  pageSize: number = 10;

  pageIndex: number = 0;

  totalElements: number = 0;

  parametrosDashboards: string = '';

  parametrosDisciplinas: string = `?page=${this.pageIndex}&size=${this.pageSize}&sort=periodoLetivo,nome,asc`;

  colors: string[] = ['#5103a0', '#00ffbb', '#af086a',
      '#2409ef', '#e89612', '#b111dd', '#de103f', '#58e222', '#00470d',
      '#f959c3', '#0070b9', '#c29564', '#5f5f5f', '#ffff00', '#f9a2cb'];

  constructor(private dashboardService: DashboardDisciplinaService,
              private disciplinaService: DisciplinaService) { }

  ngOnInit(): void {
    this.montarFiltros();
    this.montar();
    this.loading = false;
  }

  montarGraficoSexo() {
    this.dashboardService.gerarDashboardSexo(this.parametrosDashboards).subscribe({
      next: (next) => {
        this.dashboardSexo = this.converterObjectSexo(next.data);
      }
    })
  }

  montarGraficoSituacaoAlunos() {
    this.dashboardService.gerarDashboardSituacaoAlunos(this.parametrosDashboards).subscribe({
      next: (next) => this.basicDataSituacaoAlunos = this.converterObject(next.data)
    })
  }

      montarGraficoSituacaoDisciplina() {
        this.basicDataSituacaoDisciplina = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
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
            {
              label: 'Média',
              data: [20, 35, 75, 79, 66, 41, 13],
              fill: false,
              borderColor: '#E4BE1D',
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

    gerarCorDashboardSexo(conjunto: ConjuntoDadosResponse) {
      if (conjunto.legenda === 'FEMININO') {
        return '#F959C3';
      } else if (conjunto.legenda === 'MASCULINO') {
        return '#56B3FC';
      }
      return '#73797F';
    }

    converterObjectSexo(dashboardResponse: DashboardResponse): Dashboard {
      let dataSets: DataSets[] = [];
      dashboardResponse.conjuntoDados.forEach(element => {
        let background = this.gerarCorDashboardSexo(element);

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

    converterObject(dashboardResponse: DashboardResponse): Dashboard {
      let dataSets: DataSets[] = [];
      let index: number = 0;
      let cores: string[] = this.randomColor(dashboardResponse.conjuntoDados.length);
      dashboardResponse.conjuntoDados.forEach(element => {
        let background = cores[index];

        dataSets.push({
          backgroundColor: background,
          label: element.legenda,
          data: element.dados
        })
        index = index + 1;
      });

      return {
        datasets: dataSets,
        labels: dashboardResponse.legendas
      }

    }

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

    viewDisciplina(event: any) {
      let idDisciplina: number = event.srcElement.id;
    }

    montarFiltros() {
      this.disciplinaService.listarPeriodos().subscribe({
        next: (next) => this.periodos = next.data,
        error: () => alert("Não foi possivel carregar os filtros")
      })
    }

    aplicarFiltro() {
      this.parametrosDashboards = `?periodoLetivo=${this.formFiltro.value!.toString().replace(/[^[]]/gi,'')}`;
      this.montar();
    }

    montarTabelaDisciplinas() {
      this.disciplinaService.getDisciplinasResumidas(this.parametrosDisciplinas).subscribe({
        next: (next) => {
          this.disciplinasResumidas = next.data.content;
          this.totalElements = next.data.totalElements;
        },
        error: () => alert("Não foi possivel carregar as disciplinas")
      })
    }

    montarGraficos() {
      this.montarGraficoSexo();
      this.montarGraficoSituacaoAlunos();
      this.montarGraficoSituacaoDisciplina();
      this.montarGraficoNotasDisciplinas();
    }

    montarTabela() {
      this.montarTabelaDisciplinas();
    }

    montarPaginacao(event: any) {
      this.parametrosDisciplinas = `?page=${event.page}&size=${event.rows}&periodoLetivo=${this.parametrosDashboards.replace('?', '')}&sort=periodoLetivo,nome,asc`;
      this.pageSize = event.rows;
      this.pageIndex = event.page;
      this.montarTabelaDisciplinas();
    }

    montar() {
      this.montarGraficos();
      this.montarTabela();
    }

}
