import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UIChart } from 'primeng/chart';
import { PdfArquivoSubParte, PdfArquivoSubParteTipo } from 'src/app/shared/interfaces/arquivo';

import { AlunoResumido } from '../../shared/interfaces/aluno';
import { PdfArquivoRequest } from '../../shared/interfaces/arquivo';
import { ConjuntoDadosResponse, Dashboard, DashboardResponse, DataSets } from '../../shared/interfaces/dashboard';
import { AlunoService } from '../services/aluno.service';
import { DashboardService } from '../services/dashboard-disciplina.service';
import { DisciplinaService } from '../services/disciplina.service';
import { DownloadService } from '../services/download.service';
import { GeradorPdfService } from '../services/geradorPdf.service';
import { DisciplinaResumido } from './../../shared/interfaces/disciplina';

@Component({
  selector: 'app-detalhes-disciplina',
  templateUrl: './detalhes-disciplina.component.html',
  styleUrls: ['./detalhes-disciplina.component.css']
})
export class DetalhesDisciplinaComponent implements OnInit {

  disciplina: DisciplinaResumido = {
    codigo: '',
    cargaHoraria: 0,
    id: 0,
    nome: '',
    periodoLetivo: '',
    periodoMatriz: '',
    alunos: []
  };

  loading: boolean = true;

  pageNotFound!: boolean;

  alunosResumidos: AlunoResumido[] = [];

  chartImg: string[] = [];

  ignorarAusencia: string | null = 'false';

  formFiltroPeriodo = new FormControl('');

  formFiltroAusentes = new FormControl('');

  disciplinaDashboardSexo!: Dashboard;

  disciplinaDashboardSituacaoAlunos: any;

  disciplinaDashboardFrequenciaNotas: any;

  disciplinaDashboardNotasDisciplinas: any;

  parametrosDashboards: string = '';

  parametrosAlunos: string = '';

  totalElements: number = 0;

  pageSize: number = 10;

  pageIndex: number = 0;

  codigoDisciplinas?: string[] = [];

  periodos: string[] = [];

  colors: string[] = ['#5103a0', '#00ffbb', '#af086a',
    '#2409ef', '#e89612', '#b111dd', '#de103f', '#58e222', '#00470d',
    '#f959c3', '#0070b9', '#c29564', '#5f5f5f', '#ffff00', '#f9a2cb'];

  constructor(private disciplinaService: DisciplinaService,
    private dashboardService: DashboardService,
    private alunoService: AlunoService,
    private router: Router,
    private geradorPdfService: GeradorPdfService,
    private downlaodService: DownloadService) { }

  ngOnInit(): void {
    this.codigoDisciplinas = sessionStorage.getItem('codigoDisciplina')?.split("-");
    this.parametrosDashboards = `?codigo=${this.codigoDisciplinas![0]}&periodoLetivo=${this.codigoDisciplinas![1]}`;
    this.parametrosAlunos = `?page=${this.pageIndex}&size=${this.pageSize}&codigo=${this.codigoDisciplinas![0]}&periodoLetivo=${this.codigoDisciplinas![1]}&sort=nome,asc`;
    this.injetarDisciplina(this.codigoDisciplinas![2]);
    this.montarFiltros();
    this.montar();
  }

  injetarDisciplina(idDisciplina: string) {
    this.disciplinaService.getDisciplina(idDisciplina).subscribe({
      next: (next) => {
        this.disciplina = next.data;
      }
    })
  }

  aplicarFiltro() {
    if (this.formFiltroAusentes.value !== '') {
      this.ignorarAusencia = this.formFiltroAusentes.value;
    } else {
      this.ignorarAusencia = 'false';
    }

    this.parametrosDashboards = `?periodoLetivo=${this.formFiltroPeriodo.value!.toString().replace(/[^[]]/gi, '')}&ignorarAusencia=${this.ignorarAusencia}&codigo=${this.codigoDisciplinas![0]}`;
    this.parametrosAlunos = `?page=${this.pageIndex}&size=${this.pageSize}&codigo=${this.codigoDisciplinas![0]}&periodoLetivo=${this.formFiltroPeriodo.value!.toString().replace(/[^[]]/gi, '')}&ignorarAusencia=${this.ignorarAusencia}&sort=nome,asc`;
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

  viewAluno(event: any) {
    let conteudo: string = '';
    conteudo = event.srcElement.id;
    sessionStorage.setItem('codigoAluno', conteudo);
    this.router.navigate(['/dashboard-aluno'])
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

  export(charts: UIChart[]) {
    this.chartImg = [];
    charts.forEach(chart => {
      this.chartImg.push(chart.getCanvas().toDataURL('image/png'));
    })

    let arquivoSubPartes: PdfArquivoSubParte[] = [];
    arquivoSubPartes.push({
      conteudo: 'Dashboard Disciplina: '.concat(this.disciplina.nome).concat("("+this.disciplina.codigo+")"),
      tipo: PdfArquivoSubParteTipo.TITULO
    });

    arquivoSubPartes.push({
      conteudo: 'Filtros',
      tipo: PdfArquivoSubParteTipo.TITULO
    });

    if (this.formFiltroPeriodo.value?.toString() === '') {
      arquivoSubPartes.push({
        conteudo: 'Períodos: '.concat("(" + this.periodos.toString().replaceAll(',', ', ') + ")"),
        tipo: PdfArquivoSubParteTipo.TEXTO
      });

    } else {
      arquivoSubPartes.push({
        conteudo: 'Períodos: '.concat("(" + this.formFiltroPeriodo.value!.toString().replaceAll(',', ', ') + ")"),
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
      next: (next) => {
        let blob: Blob = this.downlaodService.base64toBlob(next.data.conteudo, 'application/pdf');
        let url = window.URL.createObjectURL(blob);
        window.open(url, '_blank', '');
      }
    });
  }

  montarPaginacao(event: any) {
    this.pageSize = event.rows;
    this.pageIndex = event.page;
    if (this.formFiltroAusentes.value !== '') {
      this.ignorarAusencia = this.formFiltroAusentes.value;
    } else {
      this.ignorarAusencia = 'false';
    }

    let periodoLetivo: string = this.codigoDisciplinas![1];

    if (this.formFiltroPeriodo.value !== null && this.formFiltroPeriodo.value !== '') {
      periodoLetivo = this.formFiltroPeriodo.value?.toString();
    }

    this.parametrosAlunos = `?page=${this.pageIndex}&size=${this.pageSize}&codigo=${this.codigoDisciplinas![0]}&periodoLetivo=${periodoLetivo}&ignorarAusencia=${this.ignorarAusencia}&sort=nome,asc`;
    this.montarTabelaAlunos();
  }

  montarTabelaAlunos() {
    this.alunoService.getAlunosResumidos(this.parametrosAlunos).subscribe({
      next: (next) => {
        this.alunosResumidos = next.data.content;
        this.totalElements = next.data.totalElements;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  montarFiltros() {
    this.disciplinaService.listarPeriodos(`?codigo=${this.codigoDisciplinas![0]}`).subscribe({
      next: (next) => this.periodos = next.data
    });
  }

  getElementByXpath(path: string) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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

  montarTabela() {
    this.montarTabelaAlunos();
  }

  montarGraficos() {
    this.montarGraficoSexo();
    this.montarGraficoSituacaoAlunos();
    this.montarGraficoFrequenciaNota();
    this.montarGraficoNotasDisciplinas();
  }

  montar() {
    this.montarGraficos();
    this.montarTabela();
  }

}
