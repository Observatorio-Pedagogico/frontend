import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ExtracaoService } from '../services/extracao.service';
import { Arquivo, Extracao } from '../model/extracao';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { EXTRACAO_LISTAGEM_ENVIO } from 'src/app/shared/utils/routes';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro-extracao',
  templateUrl: './cadastro-extracao.component.html',
  styleUrls: ['./cadastro-extracao.component.css']
})
export class CadastroExtracaoComponent implements OnInit {

    form: UntypedFormGroup;

    uploadedFiles: any[] = [];

    constructor(
        private formBuilder: UntypedFormBuilder,
        private location: Location,
        private extracaoService: ExtracaoService,
        private stringUtils: StringUtils,
        private messageService: MessageService
    ) {
        this.form = this.formBuilder.group({
        titulo: [null],
        periodoLetivoTipo: [null],
        periodoLetivo: [null],
        descricao: [null],
        arquivoDescricao: [null],
        arquivoAluno: [null]
        });
    }

    ngOnInit(): void {
    }

    alteraNomeArquivoSelecionado(_idInput: string, _idText: string, _nome: string): void {
        let arquivo = (document.getElementById(_idInput) as HTMLInputElement).files?.item(0);
        let text = document.getElementById(_idText) as HTMLInputElement;
        if (arquivo) {
            text.textContent = this.stringUtils.truncate(arquivo.name, 20).toLowerCase();
        } else {
            text.textContent = _nome;
        }
    }

    salvarExtracaoEvent(): void {
      console.log(this.uploadedFiles);
        let extracao = this.form.value as Extracao;

        let arquivoDisciplina = (document.getElementById("arquivoDisciplina") as HTMLInputElement).files?.item(0);
        let arquivoAluno = (document.getElementById("arquivoAluno") as HTMLInputElement).files?.item(0);
        if (this.uploadedFiles.length < 2) {
          this.openAlert("error", "É Preciso Enviar dois arquivos!");
        }//TODO continuar daqui (arquivos vai receber o conteudo de uploadedFiles)

        if (arquivoDisciplina && arquivoAluno) {
          let _arquivoDisciplina: Arquivo = {
            conteudo: arquivoDisciplina
          }

          let _arquivoAluno: Arquivo = {
            conteudo: arquivoAluno
          }
          extracao.arquivoDisciplina = _arquivoDisciplina;
          extracao.arquivoAluno = _arquivoAluno;
        }

        this.extracaoService.salvarExtracao(extracao).subscribe({
          next: () => {
            this.form.reset();
            this.resetFiles();
            this.openAlert("sucess", "Extração Cadastrada!");
          },
          error: (error) => console.log(error),
        });
      }

      voltarButtonEvent(): void {
        this.location.back();
      }

    openAlert(_severity: string, _summary: string) {
      this.messageService.add({severity: _severity, summary: _summary});
    }

    resetFiles() {
      (document.getElementById("arquivoDisciplina") as HTMLInputElement).value = '';
      (document.getElementById("arquivoAluno") as HTMLInputElement).value = '';
      this.alteraNomeArquivoSelecionado('arquivoDisciplina', 'selectedFileDisciplina', 'Anexar Arquivo Disciplina');
      this.alteraNomeArquivoSelecionado('arquivoAluno', 'selectedFileAluno', 'Anexar Arquivo Aluno');
    }

    onChoose(event: any) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }

      this.messageService.add({severity: 'warn', summary: 'Arquivo Carregado', detail: event.files[0].name});
    }

}
