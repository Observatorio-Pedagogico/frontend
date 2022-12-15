import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { URL_BASE } from '../../environments/environment';
import { LoginForm } from '../shared/interfaces/login';
import { UsuarioCadastro } from './../shared/interfaces/cadastro';
import { ResponsePagina, ResponseBody } from '../shared/interfaces/response';
import { Funcionario } from '../shared/interfaces/funcionario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly GET_FUNCIONARIOS_COPED_ESPERA_CADASTRO = '/autenticacao/espera-cadastro/coped';

  private readonly GET_FUNCIONARIOS_PROFESSORES_ESPERA_CADASTRO = '/autenticacao/espera-cadastro/professor';

  private readonly POST_ATIVAR_PROFESSOR_ESPERA_CADASTRO = '/autenticacao/espera-cadastro/professor/ativar/';

  private readonly POST_ATIVAR_FUNC_COPED_ESPERA_CADASTRO = '/autenticacao/espera-cadastro/coped/ativar/';

  private readonly POST_DESATIVAR_PROFESSOR_ESPERA_CADASTRO = '/autenticacao/espera-cadastro/professor/desativar/';

  private readonly POST_DESATIVAR_FUNC_COPED_ESPERA_CADASTRO = '/autenticacao/espera-cadastro/coped/desativar/';

  private readonly GET_FUNCIONARIOS_COPED = '/autenticacao/coped';

  private readonly GET_FUNCIONARIOS_PROFESSORES = '/autenticacao/professor';

  private readonly POST_ATIVAR_PROFESSOR = '/autenticacao/professor/ativar/';

  private readonly POST_ATIVAR_FUNC_COPED = '/autenticacao/coped/ativar/';

  private readonly POST_DESATIVAR_PROFESSOR = '/autenticacao/professor/desativar/';

  private readonly POST_DESATIVAR_FUNC_COPED = '/autenticacao/coped/desativar/';

  constructor(private httpClient: HttpClient, private router:Router) { }

  logar(login: LoginForm) : Observable<LoginForm> {
    return this.httpClient.post<LoginForm>(URL_BASE.concat('/autenticacao/login'), login);
  }

  criarHeaderAuth(): HttpHeaders {
    const token: string | null = sessionStorage.getItem("token");

    if (token === null) {
      return new HttpHeaders();
    }
    let header: HttpHeaders = new HttpHeaders({'Authorization':`Bearer ${token}`});
    return header;
  }

  cadastrarUsuario(usuario: UsuarioCadastro){
    this.httpClient.post(`${ URL_BASE }/autenticacao/cadastrar`, usuario)
    .subscribe(resultado => {
      location.href = '/login';
    });
  }

  getFuncionariosCopedEsperaCadastro(parametros: string) {
    return this.httpClient.get<ResponsePagina<Funcionario[]>>(URL_BASE.concat(this.GET_FUNCIONARIOS_COPED_ESPERA_CADASTRO).concat(parametros), {headers: this.criarHeaderAuth()});
  }

  getFuncionariosProfessoresEsperaCadastro(parametros: string) {
    return this.httpClient.get<ResponsePagina<Funcionario[]>>(URL_BASE.concat(this.GET_FUNCIONARIOS_PROFESSORES_ESPERA_CADASTRO).concat(parametros), {headers: this.criarHeaderAuth()});
  }

  postAtivarProfessorEsperaCadastro(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.POST_ATIVAR_PROFESSOR_ESPERA_CADASTRO).concat(id), id, {headers: this.criarHeaderAuth()});
  }

  postAtivarFuncionarioCopedEsperaCadastro(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.POST_ATIVAR_FUNC_COPED_ESPERA_CADASTRO).concat(id), id, {headers: this.criarHeaderAuth()});
  }

  postDesativarProfessorEsperaCadastro(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.POST_DESATIVAR_PROFESSOR_ESPERA_CADASTRO).concat(id), id, {headers: this.criarHeaderAuth()});
  }

  postDesativarFuncionarioCopedEsperaCadastro(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.POST_DESATIVAR_FUNC_COPED_ESPERA_CADASTRO).concat(id), id, {headers: this.criarHeaderAuth()});
  }

  getFuncionariosCoped(parametros: string) {
    return this.httpClient.get<ResponsePagina<Funcionario[]>>(URL_BASE.concat(this.GET_FUNCIONARIOS_COPED).concat(parametros), {headers: this.criarHeaderAuth()});
  }

  getFuncionariosProfessores(parametros: string) {
    return this.httpClient.get<ResponsePagina<Funcionario[]>>(URL_BASE.concat(this.GET_FUNCIONARIOS_PROFESSORES).concat(parametros), {headers: this.criarHeaderAuth()});
  }

  postAtivarProfessor(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.POST_ATIVAR_PROFESSOR).concat(id), id, {headers: this.criarHeaderAuth()});
  }

  postAtivarFuncionarioCoped(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.POST_ATIVAR_FUNC_COPED).concat(id), id, {headers: this.criarHeaderAuth()});
  }

  postDesativarProfessor(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.POST_DESATIVAR_PROFESSOR).concat(id), id, {headers: this.criarHeaderAuth()});
  }

  postDesativarFuncionarioCoped(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.POST_DESATIVAR_FUNC_COPED).concat(id), id, {headers: this.criarHeaderAuth()});
  }

}
