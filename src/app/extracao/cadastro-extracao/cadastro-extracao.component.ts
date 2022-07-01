import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ExtracaoService } from '../services/extracao.service';
import { Extracao } from '../model/extracao';

@Component({
  selector: 'app-cadastro-extracao',
  templateUrl: './cadastro-extracao.component.html',
  styleUrls: ['./cadastro-extracao.component.css']
})
export class CadastroExtracaoComponent implements OnInit {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private location: Location,
        private extracaoService: ExtracaoService
    ) {
        this.form = this.formBuilder.group({
        titulo: [null],
        periodoLetivoTipo: [null],
        periodoLetivo: [null],
        descricao: [null]
        });
    }

    salvarExtracaoEvent(): void {
        // if (this.form.status !== 'VALID') return;

        let extracaoForm = this.form.value as Extracao;

        var primeiroArquivo = (document.getElementById("primeiroArquivo") as HTMLInputElement).files?.item(0);
        if (primeiroArquivo) {
        extracaoForm.arquivo.conteudo = primeiroArquivo;
        }

        console.log(extracaoForm.arquivo);
        this.extracaoService;
    }

    voltarButtonEvent(): void {
        this.location.back();
    }

    ngOnInit(): void {
    }
}
