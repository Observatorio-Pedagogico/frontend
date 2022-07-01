import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ExtracaoService } from '../services/extracao.service';
import { Arquivo, Extracao } from '../model/extracao';

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

        let extracao = this.form.value as Extracao;

        var primeiroArquivo = (document.getElementById("primeiroArquivo") as HTMLInputElement).files?.item(0);
        if (primeiroArquivo) {
            let arquivo: Arquivo = {
                conteudo: primeiroArquivo
            }
            extracao.arquivo = arquivo;
        }

        console.log(extracao.arquivo.conteudo)
        this.extracaoService.salvar(extracao).subscribe({
            next: (response) => console.log(response),
            error: (error) => console.log(error),
        });
    }

    voltarButtonEvent(): void {
        this.location.back();
    }

    ngOnInit(): void {
    }
}
