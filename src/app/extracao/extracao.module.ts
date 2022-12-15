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
import { ChartModule } from 'primeng/chart';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { AlertModule } from '../components/alert/alert.module';
import { DashboardDisciplinaComponent } from '../disciplina/dashboard-disciplina/dashboard-disciplina.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CadastroExtracaoComponent } from './cadastro-extracao/cadastro-extracao.component';
import { DetalhesExtracaoComponent } from './detalhes-extracao/detalhes-extracao.component';
import { ExtracaoRoutingModule } from './extracao-routing.module';
import { ListagemExtracoesComponent } from './listagem-extracoes/listagem-extracoes.component';
import { DetalhesDisciplinaComponent } from '../disciplina/detalhes-disciplina/detalhes-disciplina.component';

@NgModule({
  declarations: [
    CadastroExtracaoComponent,
    ListagemExtracoesComponent,
    DetalhesExtracaoComponent,
    DashboardDisciplinaComponent,
    DetalhesDisciplinaComponent
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
    PaginatorModule,
    ChartModule
  ]
})
export class ExtracaoModule { }
