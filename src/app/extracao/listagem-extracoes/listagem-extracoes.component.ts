import { Component, OnInit } from '@angular/core';
import { ExtracaoResumido } from '../model/extracao';

@Component({
  selector: 'app-listagem-extracoes',
  templateUrl: './listagem-extracoes.component.html',
  styleUrls: ['./listagem-extracoes.component.css']
})
export class ListagemExtracoesComponent implements OnInit {

  extracoes: ExtracaoResumido[] = [];

  displayedColumns = ['codigo','titulo', 'status', 'periodoLetivo', 'dataCadastro','dataUltimaAtualizacao','visualizacao','deletar'];

  constructor() { }

  ngOnInit(): void {
  }

}
