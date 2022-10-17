import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { AlertModule } from '../components/alert/alert.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CadastroExtracaoComponent } from './cadastro-extracao/cadastro-extracao.component';
import { DetalhesExtracaoComponent } from './detalhes-extracao/detalhes-extracao.component';
import { ExtracaoRoutingModule } from './extracao-routing.module';
import { ListagemExtracoesComponent } from './listagem-extracoes/listagem-extracoes.component';
import { PaginatorModule } from 'primeng/paginator';

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
    TableModule,
    DropdownModule,
    MatMenuModule,
    ConfirmPopupModule,
    ToastModule,
    PaginatorModule
  ]
})
export class ExtracaoModule { }
