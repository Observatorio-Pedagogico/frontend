import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UIChart } from 'primeng/chart';
import { PdfArquivoSubParte } from 'src/app/shared/interfaces/arquivo';

import { PdfArquivoRequest, PdfArquivoSubParteTipo } from '../../shared/interfaces/arquivo';
import { ConjuntoDadosResponse } from '../../shared/interfaces/dashboard';
import { DashboardService } from '../services/dashboard-disciplina.service';
import { DisciplinaService } from '../services/disciplina.service';
import { DownloadService } from '../services/download.service';
import { GeradorPdfService } from '../services/geradorPdf.service';
import { Dashboard, DashboardResponse, DataSets } from './../../shared/interfaces/dashboard';
import { DisciplinaResumido } from './../../shared/interfaces/disciplina';

@Component({
  selector: 'app-dashboard-disciplina',
  templateUrl: './dashboard-disciplina.component.html',
  styleUrls: ['./dashboard-disciplina.component.css']
})
export class DashboardDisciplinaComponent implements OnInit {

  loading: boolean = true;

  pageNotFound: boolean = false;

  ignorarAusencia: string | null = 'false';

  dashboardSexo!: Dashboard;

  basicDataSituacaoAlunos: any;

  basicDataFrequenciaNotas: any;

  basicDataNotasDisciplinas: any;

  basicOptions: any;

  formFiltroPeriodo = new FormControl('');

  formFiltroAusentes = new FormControl('');

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

  chartImg: string[] = [];

  constructor(private dashboardService: DashboardService,
    private disciplinaService: DisciplinaService,
    private downlaodService: DownloadService,
    private router: Router,
    private geradorPdfService: GeradorPdfService) { }

  ngOnInit() {
    this.montarFiltros();
    this.montar();
  }

  montarGraficoSexo() {
    this.dashboardService.gerarDashboardSexo(this.parametrosDashboards).subscribe({
      next: (next) => {
        this.dashboardSexo = this.converterObjectSexo(next.data);
      },
      error: () => {
        this.pageNotFound = true;
      }
    })
  }

  montarGraficoSituacaoAlunos() {
    this.dashboardService.gerarDashboardSituacaoAlunos(this.parametrosDashboards).subscribe({
      next: (next) => this.basicDataSituacaoAlunos = this.converterObject(next.data)
    })
  }

  montarGraficoFrequenciaNota() {
    this.dashboardService.gerarDashboardFrequenciaNota(this.parametrosDashboards).subscribe({
      next: (next) => this.basicDataFrequenciaNotas = this.converterObject(next.data)
    })
  }

  montarGraficoNotasDisciplinas() {
    this.dashboardService.gerarDashboardNotasDisciplinas(this.parametrosDashboards).subscribe({
      next: (next) => this.basicDataNotasDisciplinas = this.converterObject(next.data)
    })
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

  converterObjectLine(dashboardResponse: DashboardResponse): Dashboard {
    let dataSets: DataSets[] = [];
    let index: number = 0;
    let cores: string[] = this.randomColor(dashboardResponse.conjuntoDados.length);
    dashboardResponse.conjuntoDados.forEach(element => {
      let background = cores[index];

      dataSets.push({
        borderColor: background,
        label: element.legenda,
        data: element.dados,
        tension: .4
      })
      index = index + 1;
    });

    return {
      datasets: dataSets,
      labels: dashboardResponse.legendas
    }

  }

  export(charts: UIChart[]) {
    this.chartImg = [];
    charts.forEach(chart => {
      this.chartImg.push(chart.getCanvas().toDataURL('image/png'));
    })

    let arquivoSubPartes: PdfArquivoSubParte[] = [];
    arquivoSubPartes.push({
      conteudo: 'Dashboard Geral',
      tipo: PdfArquivoSubParteTipo.TITULO
    });

    arquivoSubPartes.push({
      conteudo: 'Filtros',
      tipo: PdfArquivoSubParteTipo.TITULO
    });

    if (this.formFiltroPeriodo.value?.toString() === '') {
      arquivoSubPartes.push({
        conteudo: 'Períodos: '.concat("("+this.periodos.toString().replaceAll(',', ', ')+")"),
        tipo: PdfArquivoSubParteTipo.TEXTO
      });

    } else {
      arquivoSubPartes.push({
        conteudo: 'Períodos: '.concat("("+this.formFiltroPeriodo.value!.toString().replaceAll(',', ', ')+")"),
        tipo: PdfArquivoSubParteTipo.TEXTO
      });
    }

    if (this.formFiltroAusentes.value === "") {
      arquivoSubPartes.push({
        conteudo: 'Ignorar Ausência(Reprovados por faltas, Trancados e Cancelados): '.concat("Não"),
        tipo: PdfArquivoSubParteTipo.TEXTO
      });

    } else {
      arquivoSubPartes.push({
        conteudo: 'Ignorar Ausência(Reprovados por faltas, Trancados e Cancelados): '.concat((this.formFiltroAusentes.value) ? "Sim" : "Não"),
        tipo: PdfArquivoSubParteTipo.TEXTO
      });
    }

    arquivoSubPartes.push({
      conteudo: this.chartImg[0],
      tituloConteudo: 'Total De Alunos Por Sexo',
      tipo: PdfArquivoSubParteTipo.IMAGEM
    });

    arquivoSubPartes.push({
      conteudo: this.chartImg[1],
      tituloConteudo: 'Situação Das Notas Por Período',
      tipo: PdfArquivoSubParteTipo.IMAGEM
    });

    arquivoSubPartes.push({
      conteudo: this.chartImg[2],
      tituloConteudo: 'Situação Dos Alunos Por Período',
      tipo: PdfArquivoSubParteTipo.IMAGEM
    });

    arquivoSubPartes.push({
      conteudo: this.chartImg[3],
      tituloConteudo: 'Notas Das Disciplinas Por Período',
      tipo: PdfArquivoSubParteTipo.IMAGEM
    });

    let request: PdfArquivoRequest = {
      subPartes: arquivoSubPartes
    }

    this.geradorPdfService.gerarPdf(request).subscribe({
      next:(next) => {
        let blob: Blob = this.downlaodService.base64toBlob(next.data.conteudo, 'application/pdf');
        let url = window.URL.createObjectURL(blob);
        window.open(url, '_blank', '');
      }
    });
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

      j = Math.floor(Math.random() * (i + 1));

      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;

    }

    return array;
  }

  viewDisciplina(event: any) {
    let conteudo: string = '';
    conteudo = event.srcElement.id;
    sessionStorage.setItem('codigoDisciplina', conteudo);
    this.router.navigate(['/dashboard-disciplina'])
  }

  montarFiltros() {
    this.disciplinaService.listarPeriodos('').subscribe({
      next: (next) => this.periodos = next.data
    })
  }

  aplicarFiltro() {
    if (this.formFiltroAusentes.value !== '') {
      this.ignorarAusencia = this.formFiltroAusentes.value;
    } else {
      this.ignorarAusencia = 'false';
    }
    this.parametrosDashboards = `?periodoLetivo=${this.formFiltroPeriodo.value!.toString().replace(/[^[]]/gi, '')}&ignorarAusencia=${this.ignorarAusencia}`;
    this.parametrosDisciplinas = `?page=${this.pageIndex}&size=${this.pageSize}&periodoLetivo=${this.formFiltroPeriodo.value!.toString().replace(/[^[]]/gi, '')}&sort=periodoLetivo,nome,asc`
    this.montar();
  }

  montarTabelaDisciplinas() {
    this.disciplinaService.getDisciplinasResumidas(this.parametrosDisciplinas).subscribe({
      next: (next) => {
        this.disciplinasResumidas = next.data.content;
        this.totalElements = next.data.totalElements;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  montarGraficos() {
    this.montarGraficoSexo();
    this.montarGraficoSituacaoAlunos();
    this.montarGraficoFrequenciaNota();
    this.montarGraficoNotasDisciplinas();
  }

  montarTabela() {
    this.montarTabelaDisciplinas();
  }

  montarPaginacao(event: any) {
    this.parametrosDisciplinas = `?page=${event.page}&size=${event.rows}&periodoLetivo=${this.formFiltroPeriodo.value!.toString().replace(/[^[]]/gi, '')}&sort=periodoLetivo,nome,asc`;
    this.pageSize = event.rows;
    this.pageIndex = event.page;
    this.montarTabelaDisciplinas();
  }

  montar() {
    this.montarGraficos();
    this.montarTabela();
  }

}
