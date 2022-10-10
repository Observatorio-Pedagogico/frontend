import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { firstValueFrom } from 'rxjs';
import { EXTRACAO_NOVA_EXTRACAO } from 'src/app/shared/utils/routes';
import { ExtracaoResumido } from '../model/extracao';
import { ExtracaoService } from '../services/extracao.service';

@Component({
  selector: 'app-listagem-extracoes',
  templateUrl: './listagem-extracoes.component.html',
  styleUrls: ['./listagem-extracoes.component.css']
})
export class ListagemExtracoesComponent implements OnInit {

  extracoes: ExtracaoResumido[] = [];

  pageIndex: number = 1;
  pageSize: number = 2;
  pagesTotal: number = 0;

  displayedColumns = ['codigo','titulo', 'status', 'periodoLetivo', 'dataCadastro','dataUltimaAtualizacao','visualizacao','deletar'];

  constructor(private extracaoService: ExtracaoService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.listarExtracoes([]);
  }

  moverParaNovaExtracao() {
    window.location.href = EXTRACAO_NOVA_EXTRACAO;
  }

  async listarExtracoes(argumentos: string[]): Promise<void> {
    await firstValueFrom(this.extracaoService.listarExtracao(argumentos))
    .then(response => {
      this.extracoes = response.data.content;
      this.pagesTotal = response.data.totalPages;
    })
  }

  montarPagina(event: PageEvent) {
    const vetor: string[] = [`page=${event.pageIndex}`,
                             `size=${event.pageSize}`,
                             `sort=titulo,asc`];
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarExtracoes(vetor);
  }


  converterData(date: Date) {
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  }
}
