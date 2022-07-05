import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ExtracaoService } from '../services/extracao.service';
import { Arquivo, Extracao } from '../model/extracao';
import { StringUtils } from 'src/app/shared/utils/string-utils';

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
        private extracaoService: ExtracaoService,
        private stringUtils: StringUtils
    ) {
        this.form = this.formBuilder.group({
        titulo: [null],
        periodoLetivoTipo: [null],
        periodoLetivo: [null],
        descricao: [null]
        });
    }

    alteraNomeArquivoSelecionado(_idInput: string, _idText: string): void {
        var arquivo = (document.getElementById(_idInput) as HTMLInputElement).files?.item(0);
        var text = document.getElementById(_idText) as HTMLInputElement;
        if (arquivo) {
            text.textContent = this.stringUtils.truncate(arquivo.name, 20).toLowerCase();
        } else {
            text.textContent = "Anexar Arquivo 1";
        }
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
        this.extracaoService.salvarExtracao(extracao).subscribe({
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
