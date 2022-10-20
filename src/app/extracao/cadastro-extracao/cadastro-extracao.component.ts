import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { StringUtils } from 'src/app/shared/utils/string-utils';

import { Arquivo, Extracao } from '../model/extracao';
import { ExtracaoService } from '../services/extracao.service';
import { AlertComponent } from '../../components/alert/alert/alert.component';

@Component({
  selector: 'app-cadastro-extracao',
  templateUrl: './cadastro-extracao.component.html',
  styleUrls: ['./cadastro-extracao.component.css'],
  providers: [AlertComponent]
})
export class CadastroExtracaoComponent implements OnInit {

    form: UntypedFormGroup;

    uploadedFiles: File[] = [];

    constructor(
        private formBuilder: UntypedFormBuilder,
        private location: Location,
        private extracaoService: ExtracaoService,
        private stringUtils: StringUtils,
        private messageService: MessageService,
        private alertComponent: AlertComponent
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
        let extracao = this.form.value as Extracao;

        if (this.uploadedFiles.length < 2) {
          this.alertComponent.openAlert("error", "É Preciso Enviar dois arquivos!", "");
          return;
        }

        const arquivos: Arquivo[] = [];

        this.uploadedFiles.forEach(file => {
          let arquivo: Arquivo = {conteudo: file}
          arquivos.push(arquivo);
        })

        extracao.arquivosMultipartFile = arquivos;

        this.extracaoService.salvarExtracao(extracao).subscribe({
          next: () => {
            this.form.reset();
            this.clearFilesViewList();
            this.alertComponent.openAlert("success", "Extração Cadastrada!", "");
          },
          error: (error) => console.error(error),
        });
      }

      voltarButtonEvent(): void {
        this.location.back();
      }



    onChoose(event: any) {
      if (event.files.length > 2) {
        this.clearFilesViewList();
        this.alertComponent.openAlert("error", "Permitido máximo de 2(dois) arquivos.", "")
        return;
      }

      const array = [];
      for (let file of event.files) {
          array.push(file);
      }
      this.uploadedFiles = array;
      this.atualizarButtonAnexarArquivo();
      this.alertComponent.openAlert("info", "Arquivo Carregado", event.files[0].name);
    }

    onClear() {
      this.uploadedFiles = [];
      this.atualizarButtonAnexarArquivo();
    }

    onRemove(event: any) {
      const index = this.uploadedFiles.indexOf(event.file, 0);
      if (index > -1) {
        this.uploadedFiles.splice(index, 1);
      }
      this.atualizarButtonAnexarArquivo();
    }

    onValidarForm(): boolean {
      return this.form.invalid || this.uploadedFiles.length < 2;
    }

    getElementByXpath(path: string) {
      return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    atualizarButtonAnexarArquivo() {
      const buttonUpload = this.getElementByXpath("/html/body/app-root/app-cadastro-extracao/form/p-fileupload/div/div[1]/span") as HTMLSpanElement;
      if (this.uploadedFiles.length >= 2) {
        buttonUpload.style.display = "none";
      } else {
        buttonUpload.style.display = "inline-flex";
      }
    }

    clearFilesViewList() {
      const buttonClean = this.getElementByXpath("/html/body/app-root/app-cadastro-extracao/form/p-fileupload/div/div[1]/p-button/button") as HTMLButtonElement;
      setTimeout(() => {
        buttonClean.click();
      }, 0.5);
    }
  }
