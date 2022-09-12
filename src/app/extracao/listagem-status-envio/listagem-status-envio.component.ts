import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EXTRACAO_NOVA_EXTRACAO } from 'src/app/shared/utils/routes';
import { ExtracaoThread } from '../model/extracao';
import { ExtracaoService } from '../services/extracao.service';

@Component({
  selector: 'app-listagem-status-envio',
  templateUrl: './listagem-status-envio.component.html',
  styleUrls: ['./listagem-status-envio.component.css']
})

export class ListagemStatusEnvioComponent implements OnInit {

  segundoAtualizacao = 1;
  arquivosEnviados: ExtracaoThread[] = [];

  displayedColumns = ['titulo', 'periodoLetivoTipo', 'periodoLetivo', 'status','porcentagemEnvio'];

  constructor(
    private extracaoService: ExtracaoService,
  ) {}

  async listarStatusEnvio(): Promise<void> {
    await firstValueFrom(this.extracaoService.listarStatusEnvio())
    .then(response => {
      this.validarExtracaoThreadList(response.data);
      this.arquivosEnviados = response.data;
    })
    .catch(() => {
      this.arquivosEnviados = [];
    })
  }

  moverParaNovaExtracao() {
    window.location.href = EXTRACAO_NOVA_EXTRACAO;
  }

  ngOnInit(): void {
    this.listarStatusEnvio();
    this.sleep();
  }

  async sleep() {
    setTimeout(() => {
      this.listarStatusEnvio()
      this.sleep();
    },this.segundoAtualizacao * 1000);
  }

  validarExtracaoThreadList(extracaoThread: ExtracaoThread[]): ExtracaoThread[] {
    let extracaoNova: ExtracaoThread[] = [];
    this.arquivosEnviados.forEach(element => {
      if (!extracaoThread.includes(element)) {
        this.arquivosEnviados.splice(this.arquivosEnviados.indexOf(element), 1);
        console.log(this.arquivosEnviados)
      }
    });
    return extracaoNova;
  }
}
