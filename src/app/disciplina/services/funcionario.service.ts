import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvelopeFuncionario, UpdateProfessorDisciplinaRequest } from 'src/app/shared/interfaces/funcionario';

import { URL_BASE } from '../../../environments/environment';
import { LoginService } from '../../authenticacao/login.service';
import { ResponseBody } from '../../shared/interfaces/response';
import { ProfessorResponse } from '../../shared/interfaces/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly POST_ADICIONAR_DISCIPLINA_AO_PROFESSOR = '/funcionario/professor/adicionar-disciplina';
  private readonly POST_REMOVER_DISCIPLINA_AO_PROFESSOR = '/funcionario/professor/remover-disciplina';
  private readonly GET_PROFESSOR = '/funcionario/professor/';

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  obterUsuarioLogado() {
    const token = sessionStorage.getItem('token');
    let header: HttpHeaders = new HttpHeaders({ 'token': `${token}`, 'Authorization': `Bearer ${token}` });
    return this.httpClient.get<ResponseBody<EnvelopeFuncionario>>(URL_BASE.concat('/funcionario/token'), { headers: header });
  }

  adicionarDisciplinaAoProfessor(updateProfessorDisciplinaRequest: UpdateProfessorDisciplinaRequest) {
    return this.httpClient.post(URL_BASE.concat(this.POST_ADICIONAR_DISCIPLINA_AO_PROFESSOR), updateProfessorDisciplinaRequest, {headers: this.loginService.criarHeaderAuth()});
  }

  removerDisciplinaAoProfessor(updateProfessorDisciplinaRequest: UpdateProfessorDisciplinaRequest) {
    return this.httpClient.post(URL_BASE.concat(this.POST_REMOVER_DISCIPLINA_AO_PROFESSOR), updateProfessorDisciplinaRequest, {headers: this.loginService.criarHeaderAuth()});
  }

  getProfessor(idProfessor: number) {
    return this.httpClient.get<ResponseBody<ProfessorResponse>>(URL_BASE.concat(this.GET_PROFESSOR).concat(idProfessor.toString()), {headers: this.loginService.criarHeaderAuth()});
  }

}
