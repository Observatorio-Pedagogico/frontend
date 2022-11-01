import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UIChart } from 'primeng/chart';
import { ArquivoSubParte } from 'src/app/shared/interfaces/arquivo';

import { ArquivoSubParteTipo } from '../../shared/interfaces/arquivo';
import { ConjuntoDadosResponse } from '../../shared/interfaces/dashboard';
import { DashboardService } from '../services/dashboard-disciplina.service';
import { DisciplinaService } from '../services/disciplina.service';
import { DownloadServiceService } from '../services/download-service.service';
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

  formFiltroAlunosReprovadosPorFalta = new FormControl('');

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
    private downlaodService: DownloadServiceService,
    private router: Router) { }

  ngOnInit() {
    this.montarFiltros();
    this.montar();
    // this.loading = false;
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
      this.chartImg.push(chart.getBase64Image());
    })
    let arquivoSubPartes: ArquivoSubParte[] = [];
    arquivoSubPartes.push({
      conteudo: 'titulo aqui',
      tipo: ArquivoSubParteTipo.TITULO
    });

    arquivoSubPartes.push({
      conteudo: 'texto aqui',
      tipo: ArquivoSubParteTipo.TEXTO
    });

    arquivoSubPartes.push({
      conteudo: this.chartImg[0],
      tituloConteudo: 'dashboard',
      tipo: ArquivoSubParteTipo.IMAGEM
    });

    let blob: Blob = this.downlaodService.base64toBlob('JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA1NTg5Cj4+CnN0cmVhbQowLjU3IHcKMCBHCjAuMTYgMC41MCAwLjczIHJnCjAuNzggRwowLjAwIHcKMC4xNiAwLjUwIDAuNzMgcmcKNDAuMDAgODAxLjg5IDExOC45NiAtMjEuNTAgcmUKZgpCVAovRjIgMTAgVGYKMTEuNTAgVEwKMS4wMDAgZwo0NS4wMCA3ODguMzkgVGQKKENvZGUpIFRqCkVUCjAuMTYgMC41MCAwLjczIHJnCjAuNzggRwowLjAwIHcKMC4xNiAwLjUwIDAuNzMgcmcKMTU4Ljk2IDgwMS44OSAxNjYuODYgLTIxLjUwIHJlCmYKQlQKL0YyIDEwIFRmCjExLjUwIFRMCjEuMDAwIGcKMTYzLjk2IDc4OC4zOSBUZAooTmFtZSkgVGoKRVQKMC4xNiAwLjUwIDAuNzMgcmcKMC43OCBHCjAuMDAgdwowLjE2IDAuNTAgMC43MyByZwozMjUuODIgODAxLjg5IDEyOC4wMSAtMjEuNTAgcmUKZgpCVAovRjIgMTAgVGYKMTEuNTAgVEwKMS4wMDAgZwozMzAuODIgNzg4LjM5IFRkCihDYXRlZ29yeSkgVGoKRVQKMC4xNiAwLjUwIDAuNzMgcmcKMC43OCBHCjAuMDAgdwowLjE2IDAuNTAgMC43MyByZwo0NTMuODMgODAxLjg5IDEwMS40NSAtMjEuNTAgcmUKZgpCVAovRjIgMTAgVGYKMTEuNTAgVEwKMS4wMDAgZwo0NTguODMgNzg4LjM5IFRkCihRdWFudGl0eSkgVGoKRVQKMC45NiBnCjAuNzggRwowLjAwIHcKMC45NiBnCjQwLjAwIDc4MC4zOSAxMTguOTYgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKNDUuMDAgNzY2Ljg5IFRkCihmMjMwZmgwZzMpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4wMCB3CjAuOTYgZwoxNTguOTYgNzgwLjM5IDE2Ni44NiAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwoxNjMuOTYgNzY2Ljg5IFRkCihCYW1ib28gV2F0Y2gpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4wMCB3CjAuOTYgZwozMjUuODIgNzgwLjM5IDEyOC4wMSAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwozMzAuODIgNzY2Ljg5IFRkCihBY2Nlc3NvcmllcykgVGoKRVQKMC45NiBnCjAuNzggRwowLjAwIHcKMC45NiBnCjQ1My44MyA3ODAuMzkgMTAxLjQ1IC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjQ1OC44MyA3NjYuODkgVGQKKDI0KSBUagpFVAoxLjAwIGcKMC43OCBHCjAuMDAgdwoxLjAwIGcKNDAuMDAgNzU4Ljg5IDExOC45NiAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwo0NS4wMCA3NDUuMzkgVGQKKG52a2xhbDQzMykgVGoKRVQKMS4wMCBnCjAuNzggRwowLjAwIHcKMS4wMCBnCjE1OC45NiA3NTguODkgMTY2Ljg2IC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjE2My45NiA3NDUuMzkgVGQKKEJsYWNrIFdhdGNoKSBUagpFVAoxLjAwIGcKMC43OCBHCjAuMDAgdwoxLjAwIGcKMzI1LjgyIDc1OC44OSAxMjguMDEgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKMzMwLjgyIDc0NS4zOSBUZAooQWNjZXNzb3JpZXMpIFRqCkVUCjEuMDAgZwowLjc4IEcKMC4wMCB3CjEuMDAgZwo0NTMuODMgNzU4Ljg5IDEwMS40NSAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwo0NTguODMgNzQ1LjM5IFRkCig2MSkgVGoKRVQKMC45NiBnCjAuNzggRwowLjAwIHcKMC45NiBnCjQwLjAwIDczNy4zOSAxMTguOTYgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKNDUuMDAgNzIzLjg5IFRkCih6ejIxY3ozYzEpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4wMCB3CjAuOTYgZwoxNTguOTYgNzM3LjM5IDE2Ni44NiAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwoxNjMuOTYgNzIzLjg5IFRkCihCbHVlIEJhbmQpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4wMCB3CjAuOTYgZwozMjUuODIgNzM3LjM5IDEyOC4wMSAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwozMzAuODIgNzIzLjg5IFRkCihGaXRuZXNzKSBUagpFVAowLjk2IGcKMC43OCBHCjAuMDAgdwowLjk2IGcKNDUzLjgzIDczNy4zOSAxMDEuNDUgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKNDU4LjgzIDcyMy44OSBUZAooMikgVGoKRVQKMS4wMCBnCjAuNzggRwowLjAwIHcKMS4wMCBnCjQwLjAwIDcxNS44OSAxMTguOTYgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKNDUuMDAgNzAyLjM5IFRkCigyNDR3Z2VyZzIpIFRqCkVUCjEuMDAgZwowLjc4IEcKMC4wMCB3CjEuMDAgZwoxNTguOTYgNzE1Ljg5IDE2Ni44NiAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwoxNjMuOTYgNzAyLjM5IFRkCihCbHVlIFQtU2hpcnQpIFRqCkVUCjEuMDAgZwowLjc4IEcKMC4wMCB3CjEuMDAgZwozMjUuODIgNzE1Ljg5IDEyOC4wMSAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwozMzAuODIgNzAyLjM5IFRkCihDbG90aGluZykgVGoKRVQKMS4wMCBnCjAuNzggRwowLjAwIHcKMS4wMCBnCjQ1My44MyA3MTUuODkgMTAxLjQ1IC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjQ1OC44MyA3MDIuMzkgVGQKKDI1KSBUagpFVAowLjk2IGcKMC43OCBHCjAuMDAgdwowLjk2IGcKNDAuMDAgNjk0LjM5IDExOC45NiAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwo0NS4wMCA2ODAuODkgVGQKKGg0NTZ3ZXI1MykgVGoKRVQKMC45NiBnCjAuNzggRwowLjAwIHcKMC45NiBnCjE1OC45NiA2OTQuMzkgMTY2Ljg2IC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjE2My45NiA2ODAuODkgVGQKKEJyYWNlbGV0KSBUagpFVAowLjk2IGcKMC43OCBHCjAuMDAgdwowLjk2IGcKMzI1LjgyIDY5NC4zOSAxMjguMDEgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKMzMwLjgyIDY4MC44OSBUZAooQWNjZXNzb3JpZXMpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4wMCB3CjAuOTYgZwo0NTMuODMgNjk0LjM5IDEwMS40NSAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwo0NTguODMgNjgwLjg5IFRkCig3MykgVGoKRVQKMS4wMCBnCjAuNzggRwowLjAwIHcKMS4wMCBnCjQwLjAwIDY3Mi44OSAxMTguOTYgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKNDUuMDAgNjU5LjM5IFRkCihhdjIyMzFmd2cpIFRqCkVUCjEuMDAgZwowLjc4IEcKMC4wMCB3CjEuMDAgZwoxNTguOTYgNjcyLjg5IDE2Ni44NiAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwoxNjMuOTYgNjU5LjM5IFRkCihCcm93biBQdXJzZSkgVGoKRVQKMS4wMCBnCjAuNzggRwowLjAwIHcKMS4wMCBnCjMyNS44MiA2NzIuODkgMTI4LjAxIC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjMzMC44MiA2NTkuMzkgVGQKKEFjY2Vzc29yaWVzKSBUagpFVAoxLjAwIGcKMC43OCBHCjAuMDAgdwoxLjAwIGcKNDUzLjgzIDY3Mi44OSAxMDEuNDUgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKNDU4LjgzIDY1OS4zOSBUZAooMCkgVGoKRVQKMC45NiBnCjAuNzggRwowLjAwIHcKMC45NiBnCjQwLjAwIDY1MS4zOSAxMTguOTYgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKNDUuMDAgNjM3Ljg5IFRkCihiaWIzNnBmdm0pIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4wMCB3CjAuOTYgZwoxNTguOTYgNjUxLjM5IDE2Ni44NiAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwoxNjMuOTYgNjM3Ljg5IFRkCihDaGFrcmEgQnJhY2VsZXQpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4wMCB3CjAuOTYgZwozMjUuODIgNjUxLjM5IDEyOC4wMSAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwozMzAuODIgNjM3Ljg5IFRkCihBY2Nlc3NvcmllcykgVGoKRVQKMC45NiBnCjAuNzggRwowLjAwIHcKMC45NiBnCjQ1My44MyA2NTEuMzkgMTAxLjQ1IC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjQ1OC44MyA2MzcuODkgVGQKKDUpIFRqCkVUCjEuMDAgZwowLjc4IEcKMC4wMCB3CjEuMDAgZwo0MC4wMCA2MjkuODkgMTE4Ljk2IC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjQ1LjAwIDYxNi4zOSBUZAoobWJ2amtnaXA1KSBUagpFVAoxLjAwIGcKMC43OCBHCjAuMDAgdwoxLjAwIGcKMTU4Ljk2IDYyOS44OSAxNjYuODYgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKMTYzLjk2IDYxNi4zOSBUZAooR2FsYXh5IEVhcnJpbmdzKSBUagpFVAoxLjAwIGcKMC43OCBHCjAuMDAgdwoxLjAwIGcKMzI1LjgyIDYyOS44OSAxMjguMDEgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKMzMwLjgyIDYxNi4zOSBUZAooQWNjZXNzb3JpZXMpIFRqCkVUCjEuMDAgZwowLjc4IEcKMC4wMCB3CjEuMDAgZwo0NTMuODMgNjI5Ljg5IDEwMS40NSAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwo0NTguODMgNjE2LjM5IFRkCigyMykgVGoKRVQKMC45NiBnCjAuNzggRwowLjAwIHcKMC45NiBnCjQwLjAwIDYwOC4zOSAxMTguOTYgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKNDUuMDAgNTk0Ljg5IFRkCih2YmIxMjRidHIpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4wMCB3CjAuOTYgZwoxNTguOTYgNjA4LjM5IDE2Ni44NiAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwoxNjMuOTYgNTk0Ljg5IFRkCihHYW1lIENvbnRyb2xsZXIpIFRqCkVUCjAuOTYgZwowLjc4IEcKMC4wMCB3CjAuOTYgZwozMjUuODIgNjA4LjM5IDEyOC4wMSAtMjEuNTAgcmUKZgpCVAovRjEgMTAgVGYKMTEuNTAgVEwKMC4zMTQgZwozMzAuODIgNTk0Ljg5IFRkCihFbGVjdHJvbmljcykgVGoKRVQKMC45NiBnCjAuNzggRwowLjAwIHcKMC45NiBnCjQ1My44MyA2MDguMzkgMTAxLjQ1IC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjQ1OC44MyA1OTQuODkgVGQKKDIpIFRqCkVUCjEuMDAgZwowLjc4IEcKMC4wMCB3CjEuMDAgZwo0MC4wMCA1ODYuODkgMTE4Ljk2IC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjQ1LjAwIDU3My4zOSBUZAooY20yMzBmMDMyKSBUagpFVAoxLjAwIGcKMC43OCBHCjAuMDAgdwoxLjAwIGcKMTU4Ljk2IDU4Ni44OSAxNjYuODYgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKMTYzLjk2IDU3My4zOSBUZAooR2FtaW5nIFNldCkgVGoKRVQKMS4wMCBnCjAuNzggRwowLjAwIHcKMS4wMCBnCjMyNS44MiA1ODYuODkgMTI4LjAxIC0yMS41MCByZQpmCkJUCi9GMSAxMCBUZgoxMS41MCBUTAowLjMxNCBnCjMzMC44MiA1NzMuMzkgVGQKKEVsZWN0cm9uaWNzKSBUagpFVAoxLjAwIGcKMC43OCBHCjAuMDAgdwoxLjAwIGcKNDUzLjgzIDU4Ni44OSAxMDEuNDUgLTIxLjUwIHJlCmYKQlQKL0YxIDEwIFRmCjExLjUwIFRMCjAuMzE0IGcKNDU4LjgzIDU3My4zOSBUZAooNjMpIFRqCkVUCjAuNzggRwowLjAwIHcKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8L1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago5IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllcgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMiAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTMgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Sb21hbgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1RpbWVzLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1JdGFsaWMKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE4IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvU3ltYm9sCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9Gb250IDw8Ci9GMSA1IDAgUgovRjIgNiAwIFIKL0YzIDcgMCBSCi9GNCA4IDAgUgovRjUgOSAwIFIKL0Y2IDEwIDAgUgovRjcgMTEgMCBSCi9GOCAxMiAwIFIKL0Y5IDEzIDAgUgovRjEwIDE0IDAgUgovRjExIDE1IDAgUgovRjEyIDE2IDAgUgovRjEzIDE3IDAgUgovRjE0IDE4IDAgUgo+PgovWE9iamVjdCA8PAo+Pgo+PgplbmRvYmoKMTkgMCBvYmoKPDwKL1Byb2R1Y2VyIChqc1BERiAxLjUuMykKL0NyZWF0aW9uRGF0ZSAoRDoyMDIyMTAyNDIwMjUwMC0wMycwMCcpCj4+CmVuZG9iagoyMCAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDU3NjUgMDAwMDAgbiAKMDAwMDAwNzU4MiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAxMjQgMDAwMDAgbiAKMDAwMDAwNTgyMiAwMDAwMCBuIAowMDAwMDA1OTQ3IDAwMDAwIG4gCjAwMDAwMDYwNzcgMDAwMDAgbiAKMDAwMDAwNjIxMCAwMDAwMCBuIAowMDAwMDA2MzQ3IDAwMDAwIG4gCjAwMDAwMDY0NzAgMDAwMDAgbiAKMDAwMDAwNjU5OSAwMDAwMCBuIAowMDAwMDA2NzMxIDAwMDAwIG4gCjAwMDAwMDY4NjcgMDAwMDAgbiAKMDAwMDAwNjk5NSAwMDAwMCBuIAowMDAwMDA3MTIyIDAwMDAwIG4gCjAwMDAwMDcyNTEgMDAwMDAgbiAKMDAwMDAwNzM4NCAwMDAwMCBuIAowMDAwMDA3NDg2IDAwMDAwIG4gCjAwMDAwMDc4MzAgMDAwMDAgbiAKMDAwMDAwNzkxNiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIxCi9Sb290IDIwIDAgUgovSW5mbyAxOSAwIFIKL0lEIFsgPDUzMTMyRDhCMTUxNjNCODM3MUFGM0RGQ0UwOUE3N0QyPiA8NTMxMzJEOEIxNTE2M0I4MzcxQUYzREZDRTA5QTc3RDI+IF0KPj4Kc3RhcnR4cmVmCjgwMjAKJSVFT0Y=', 'application/pdf');
    console.log(blob);
    this.downlaodService.downloadFile(blob);


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
    this.disciplinaService.listarPeriodos().subscribe({
      next: (next) => this.periodos = next.data
    })
  }

  aplicarFiltro() {
    if (this.formFiltroAlunosReprovadosPorFalta.value !== '') {
      this.ignorarAusencia = this.formFiltroAlunosReprovadosPorFalta.value;
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
