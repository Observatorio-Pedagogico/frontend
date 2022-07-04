import { Component, OnInit } from '@angular/core';
import { ExtracaoThread } from '../model/extracao';

@Component({
  selector: 'app-listagem-status-envio',
  templateUrl: './listagem-status-envio.component.html',
  styleUrls: ['./listagem-status-envio.component.css']
})

export class ListagemStatusEnvioComponent implements OnInit {

  arquivosEnviados: ExtracaoThread[] = [
    {porcentagemEnvio:10, extracao:{titulo: 'Angular', periodoLetivoTipo: '12', periodoLetivo: '1', status: "ENVIANDO"}},
    {porcentagemEnvio:50, extracao:{titulo: 'Java', periodoLetivoTipo: '5', periodoLetivo: '2', status: "ENVIANDO"}}
  ];

  dataSource = this.arquivosEnviados;

  displayedColumns = ['titulo', 'periodoLetivoTipo', 'periodoLetivo', 'status','porcentagemEnvio'];

  constructor() { }

  ngOnInit(): void {
  }

}
