import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtracaoRoutingModule } from './extracao-routing.module';
import { CadastroExtracaoComponent } from './cadastro-extracao/cadastro-extracao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ListagemExtracoesComponent } from './listagem-extracoes/listagem-extracoes.component';
import { DetalhesExtracaoComponent } from './detalhes-extracao/detalhes-extracao.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AlertModule } from '../components/alert/alert.module';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    CadastroExtracaoComponent,
    ListagemExtracoesComponent,
    DetalhesExtracaoComponent
  ],
  imports: [
    CommonModule,
    ExtracaoRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    AlertModule,
    FileUploadModule,
    TableModule
  ]
})
export class ExtracaoModule { }
