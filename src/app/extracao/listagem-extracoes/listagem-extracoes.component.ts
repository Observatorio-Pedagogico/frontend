import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { firstValueFrom } from 'rxjs';
import { EXTRACAO_NOVA_EXTRACAO } from 'src/app/shared/utils/routes';
import { ExtracaoResumido } from '../model/extracao';
import { ExtracaoService } from '../services/extracao.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-listagem-extracoes',
  templateUrl: './listagem-extracoes.component.html',
  styleUrls: ['./listagem-extracoes.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListagemExtracoesComponent implements OnInit {

  extracoes: ExtracaoResumido[] = [];

  statusExtracao = [
    {label: 'CANCELADA', value: 'unqualified'},
    {label: 'ATIVA', value: 'qualified'},
    {label: 'SALVANDO', value: 'new'},
    {label: 'ENVIANDO', value: 'negotiation'},
    {label: 'AGUARDANDO_PROCESSAMENTO', value: 'renewal'},
  ]

  pageIndex: number = 1;
  pageSize: number = 2;
  pagesTotal: number = 0;

  constructor(private extracaoService: ExtracaoService, private datepipe: DatePipe, private confirmationService: ConfirmationService, private messageService: MessageService) { }

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

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target!,
        message: 'Deseja realmente cancelar essa extração?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'success', summary:'Confirmed', detail:'You have accepted'});
        },
        reject: () => {
            this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        }
    });
  }
}
