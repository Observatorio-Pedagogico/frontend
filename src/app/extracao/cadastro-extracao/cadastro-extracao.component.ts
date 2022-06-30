import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-extracao',
  templateUrl: './cadastro-extracao.component.html',
  styleUrls: ['./cadastro-extracao.component.css']
})
export class CadastroExtracaoComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      titulo: [null],
      periodoLetivoTipo: [null],
      periodoLetivo: [null],
      descricao: [null]
    });
   }

  ngOnInit(): void {
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

    }

  }


}
