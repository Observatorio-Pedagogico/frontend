import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DetalhesAlunoComponent } from './aluno/detalhes-aluno/detalhes-aluno.component';
import { ListagemAlunosComponent } from './aluno/listagem-alunos/listagem-alunos.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarUsuarioComponent } from './authenticacao/cadastrar-usuario/cadastrar-usuario.component';
import { LoginComponent } from './authenticacao/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetalhesDisciplinaComponent } from './disciplina/detalhes-disciplina/detalhes-disciplina.component';
import { ListagemDisciplinasComponent } from './disciplina/listagem-disciplinas/listagem-disciplinas.component';
import { ExtracaoModule } from './extracao/extracao.module';
import { ListagemStatusEnvioComponent } from './extracao/listagem-status-envio/listagem-status-envio.component';
import { ErrorInterceptorService } from './shared/utils/services/error-interceptor.service';
import { GerenciarUsuariosComponent } from './usuario/gerenciar-usuarios/gerenciar-usuarios.component';
import { SolicitacoesUsuariosComponent } from './usuario/solicitacoes-usuarios/solicitacoes-usuarios.component';

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
    ListagemStatusEnvioComponent,
    CadastrarUsuarioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ExtracaoModule,
    MatCardModule
  ],
  providers: [DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
