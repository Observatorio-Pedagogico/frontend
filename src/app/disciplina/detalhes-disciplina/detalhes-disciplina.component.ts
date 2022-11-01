import { DisciplinaResumido } from './../../shared/interfaces/disciplina';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dashboard, DashboardResponse, DataSets, ConjuntoDadosResponse } from '../../shared/interfaces/dashboard';
import { DisciplinaService } from '../services/disciplina.service';
import { DashboardService } from '../services/dashboard-disciplina.service';

@Component({
  selector: 'app-detalhes-disciplina',
  templateUrl: './detalhes-disciplina.component.html',
  styleUrls: ['./detalhes-disciplina.component.css']
})
export class DetalhesDisciplinaComponent implements OnInit {

  disciplina!: DisciplinaResumido;

  pageNotFound!: boolean;

  constructor(private disciplinaService: DisciplinaService,
              private dashboardService: DashboardService) { }

  ignorarAusencia: string | null = 'false';

  formFiltroPeriodo = new FormControl('');

  formFiltroAlunosReprovadosPorFalta = new FormControl('');

  disciplinaDashboardSexo!: Dashboard;

  disciplinaDashboardSituacaoAlunos: any;

  disciplinaDashboardFrequenciaNotas: any;

  disciplinaDashboardNotasDisciplinas: any;

  parametrosDashboards: string = '';

  pageSize: number = 10;

  pageIndex: number = 0;

  codigoDisciplinas?: string[] = [];

  parametrosDisciplinas: string = `?page=${this.pageIndex}&size=${this.pageSize}&sort=periodoLetivo,nome,asc`;

  periodos: string[] = [];


  colors: string[] = ['#5103a0', '#00ffbb', '#af086a',
      '#2409ef', '#e89612', '#b111dd', '#de103f', '#58e222', '#00470d',
      '#f959c3', '#0070b9', '#c29564', '#5f5f5f', '#ffff00', '#f9a2cb'];

  ngOnInit(): void {
    this.codigoDisciplinas = sessionStorage.getItem('codigoDisciplina')?.split("-");
    this.parametrosDashboards = `?codigo=${this.codigoDisciplinas![0]}&periodoLetivo=${this.codigoDisciplinas![1]}`;
    this.injetarDisciplina(this.codigoDisciplinas![2]);
    this.montarFiltros();
    this.montar();
  }

  injetarDisciplina(idDisciplina: string) {
    this.disciplinaService.getDisciplina(idDisciplina).subscribe({
      next: (next) => {
        this.disciplina = next.data;
      },
      complete: () => {
          console.log(this.disciplina);
      }
    })
  }

  aplicarFiltro() {
    if (this.formFiltroAlunosReprovadosPorFalta.value !== '') {
      this.ignorarAusencia = this.formFiltroAlunosReprovadosPorFalta.value;
    } else {
      this.ignorarAusencia = 'false';
    }
    this.parametrosDashboards = `?periodoLetivo=${this.formFiltroPeriodo.value!.toString().replace(/[^[]]/gi,'')}&ignorarAusencia=${this.ignorarAusencia}&codigo=${this.codigoDisciplinas}`;
    this.parametrosDisciplinas = `?page=${this.pageIndex}&size=${this.pageSize}&periodoLetivo=${this.formFiltroPeriodo.value!.toString().replace(/[^[]]/gi,'')}&sort=periodoLetivo,nome,asc`
    this.montar();
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

  gerarCorDashboardSexo(conjunto: ConjuntoDadosResponse) {
    if (conjunto.legenda === 'FEMININO') {
      return '#F959C3';
    } else if (conjunto.legenda === 'MASCULINO') {
      return '#56B3FC';
    }
    return '#73797F';
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

  montarFiltros() {
    this.disciplinaService.listarPeriodos().subscribe({
      next: (next) => this.periodos = next.data
    })
  }

  montarGraficoSexo() {
    this.dashboardService.gerarDashboardSexo(this.parametrosDashboards).subscribe({
     next: (next) => {
       this.disciplinaDashboardSexo = this.converterObjectSexo(next.data);
     },
     error: () => {
       this.pageNotFound = true;
     }
   })
 }

  montarGraficoSituacaoAlunos() {
    this.dashboardService.gerarDashboardSituacaoAlunos(this.parametrosDashboards).subscribe({
     next: (next) => this.disciplinaDashboardSituacaoAlunos = this.converterObject(next.data)
   })
 }

  montarGraficoFrequenciaNota() {
    this.dashboardService.gerarDashboardFrequenciaNota(this.parametrosDashboards).subscribe({
     next: (next) => this.disciplinaDashboardFrequenciaNotas = this.converterObject(next.data)
   })
 }

  montarGraficoNotasDisciplinas() {
    this.dashboardService.gerarDashboardNotasDisciplinas(this.parametrosDashboards).subscribe({
     next: (next) => this.disciplinaDashboardNotasDisciplinas = this.converterObject(next.data)
   })
 }

  montarGraficos() {
    this.montarGraficoSexo();
    this.montarGraficoSituacaoAlunos();
    this.montarGraficoFrequenciaNota();
    this.montarGraficoNotasDisciplinas();
  }

  montar() {
    this.montarGraficos();
    // this.montarTabela();
  }

}
