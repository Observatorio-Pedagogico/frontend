import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListagemDisciplinasComponent } from './disciplina/listagem-disciplinas/listagem-disciplinas.component';
import { DetalhesDisciplinaComponent } from './disciplina/detalhes-disciplina/detalhes-disciplina.component';
import { ListagemAlunosComponent } from './aluno/listagem-alunos/listagem-alunos.component';
import { DetalhesAlunoComponent } from './aluno/detalhes-aluno/detalhes-aluno.component';
import { SolicitacoesUsuariosComponent } from './usuario/solicitacoes-usuarios/solicitacoes-usuarios.component';
import { GerenciarUsuariosComponent } from './usuario/gerenciar-usuarios/gerenciar-usuarios.component';
import { LoginComponent } from './login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ListagemStatusEnvioComponent } from './extracao/listagem-status-envio/listagem-status-envio.component';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ListagemDisciplinasComponent,
    DetalhesDisciplinaComponent,
    ListagemAlunosComponent,
    DetalhesAlunoComponent,
    SolicitacoesUsuariosComponent,
    GerenciarUsuariosComponent,
    LoginComponent,
    ListagemStatusEnvioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
