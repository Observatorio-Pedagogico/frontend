import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../authenticacao/login.service';
import { ResponseBody, ResponsePagina } from '../../shared/interfaces/response';
import { URL_BASE } from '../../../environments/environment';
import { DisciplinaResumido } from '../../shared/interfaces/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  private readonly DISCIPLINA_PERIODOS = '/disciplina/periodos';

  private readonly DISCIPLINA_RESUMIDO = '/disciplina/resumido';

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  listarPeriodos() {
    return this.httpClient.get<ResponseBody<string[]>>(URL_BASE.concat(this.DISCIPLINA_PERIODOS), {headers: this.loginService.criarHeaderAuth()});
  }

  getDisciplinasResumidas(parametros: string) {
    return this.httpClient.get<ResponsePagina<DisciplinaResumido[]>>(URL_BASE.concat(this.DISCIPLINA_RESUMIDO).concat(parametros), {headers: this.loginService.criarHeaderAuth()});
  }

}
