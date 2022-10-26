import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { EXTRACAO_NOVA_EXTRACAO } from 'src/app/shared/utils/routes';

import { AlertComponent } from '../../components/alert/alert/alert.component';
import { ExtracaoResumido } from '../model/extracao';
import { ExtracaoService } from '../services/extracao.service';

@Component({
  selector: 'app-listagem-extracoes',
  templateUrl: './listagem-extracoes.component.html',
  styleUrls: ['./listagem-extracoes.component.css'],
  providers: [ConfirmationService, AlertComponent]
})
export class ListagemExtracoesComponent implements OnInit {

  extracoes: ExtracaoResumido[] = [];

  statusExtracao = [
    {label: 'CANCELADA', value: 'CANCELADA'},
    {label: 'ATIVA', value: 'ATIVA'}
  ]

  pageSize: number = 10;
  pageIndex: number = 0;
  totalElements: number = 0;
  parametrosExtracao: string[] = [`page=${this.pageIndex}`,
                             `size=${this.pageSize}`,
                             `sort=titulo,asc`];

  loading = true;

  constructor(private extracaoService: ExtracaoService,
              private confirmationService: ConfirmationService,
              private alert: AlertComponent) { }

  ngOnInit(): void {
    this.listarExtracoes(this.parametrosExtracao);
  }

  moverParaNovaExtracao() {
    window.location.href = EXTRACAO_NOVA_EXTRACAO;
  }

  async listarExtracoes(argumentos: string[]): Promise<void> {
    this.loading = true;
    await firstValueFrom(this.extracaoService.listarExtracao(argumentos))
    .then(response => {
      this.extracoes = response.data.content;
      this.totalElements = response.data.totalElements;
    });
    this.loading = false;
  }

  montarPagina(event: any) {
    this.parametrosExtracao = [`page=${event.page}`,
                             `size=${event.rows}`,
                             `sort=titulo,asc`];
    this.pageSize = event.rows;
    this.pageIndex = event.page;
    this.listarExtracoes(this.parametrosExtracao);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }

  cancel(event: any) {
    this.confirmationService.confirm({
        target: event.target!,
        message: 'Deseja realmente cancelar essa extração?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim', rejectLabel: 'Não',
        accept: () => {
          this.extracaoService.cancelarExtracao(event.srcElement.id).subscribe({
            next: () => {
              this.listarExtracoes(this.parametrosExtracao);
              setTimeout(() => {
                this.alert.openAlert("success", "Extração Cancelada!", "")
              }, 500);
            }
          });
        }
    });
  }

  ativar(event: any) {
    this.confirmationService.confirm({
        target: event.target!,
        message: 'Deseja ativar essa extração?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim', rejectLabel: 'Não',
        accept: () => {
          this.extracaoService.ativarExtracao(event.srcElement.id).subscribe({
            next: () => {
              this.listarExtracoes(this.parametrosExtracao);
              setTimeout(() => {
                this.alert.openAlert("success", "Extração Ativada!", "")
              }, 500);
            }
          });
        }
    });
  }
}
