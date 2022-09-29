import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListagemDisciplinasComponent } from './disciplina/listagem-disciplinas/listagem-disciplinas.component';
import { DetalhesDisciplinaComponent } from './disciplina/detalhes-disciplina/detalhes-disciplina.component';
import { ListagemAlunosComponent } from './aluno/listagem-alunos/listagem-alunos.component';
import { DetalhesAlunoComponent } from './aluno/detalhes-aluno/detalhes-aluno.component';
import { SolicitacoesUsuariosComponent } from './usuario/solicitacoes-usuarios/solicitacoes-usuarios.component';
import { GerenciarUsuariosComponent } from './usuario/gerenciar-usuarios/gerenciar-usuarios.component';
import { LoginComponent } from './authenticacao/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ListagemStatusEnvioComponent } from './extracao/listagem-status-envio/listagem-status-envio.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CadastrarUsuarioComponent } from './authenticacao/cadastrar-usuario/cadastrar-usuario.component';
import { ExtracaoModule } from './extracao/extracao.module';
import { DatePipe } from '@angular/common';

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
    ExtracaoModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
