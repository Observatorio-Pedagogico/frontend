import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  displayedColumns = ['codigo','titulo', 'status', 'periodoLetivo', 'dataCadastro','dataUltimaAtualizacao','visualizacao','deletar'];

  constructor(private extracaoService: ExtracaoService, private datepipe: DatePipe) { }

  moverParaNovaExtracao() {
    window.location.href = EXTRACAO_NOVA_EXTRACAO;
  }

  async listarStatusEnvio(): Promise<void> {
    await firstValueFrom(this.extracaoService.listarExtracao())
    .then(response => {
      this.extracoes = response.data;
    })
    .catch((response) => {
      if (response.status === 401) {
        location.href = '/login';
      }
    })
  }

  ngOnInit(): void {
    this.listarStatusEnvio();
  }

  converterData(date: Date) {
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  }
}
