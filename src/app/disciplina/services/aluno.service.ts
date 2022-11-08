import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../authenticacao/login.service';
import { ResponsePagina, ResponseBody } from '../../shared/interfaces/response';
import { AlunoResumido } from '../../shared/interfaces/aluno';
import { URL_BASE } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly ALUNOS_RESUMIDOS = '/aluno/resumido';

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getAlunosResumidos(parametros: string) {
    return this.httpClient.get<ResponsePagina<AlunoResumido[]>>(URL_BASE.concat(this.ALUNOS_RESUMIDOS).concat(parametros), {headers: this.loginService.criarHeaderAuth()});
  }

  getAluno(idAluno: string) {
    return this.httpClient.get<ResponseBody<AlunoResumido>>(URL_BASE.concat("/aluno/").concat(idAluno), {headers: this.loginService.criarHeaderAuth()});
  }

}
