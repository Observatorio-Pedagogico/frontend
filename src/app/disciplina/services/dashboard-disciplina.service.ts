import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../authenticacao/login.service';
import { URL_BASE } from 'src/environments/environment';
import { ResponseBody } from 'src/app/shared/interfaces/response';
import { DashboardResponse } from 'src/app/shared/interfaces/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardDisciplinaService {

  private readonly DASHBOARD_SEXO = '/dashboard/sexo';

  private readonly DASHBOARD_SITUACAO_ALUNO = '/dashboard/situacao-aluno';

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  gerarDashboardSexo(parametros: string) {
    return this.httpClient.get<ResponseBody<DashboardResponse>>(URL_BASE.concat(this.DASHBOARD_SEXO).concat(parametros), {headers: this.loginService.criarHeaderAuth()});
  }

  gerarDashboardSituacaoAlunos(parametros: string) {
    return this.httpClient.get<ResponseBody<DashboardResponse>>(URL_BASE.concat(this.DASHBOARD_SITUACAO_ALUNO).concat(parametros), {headers: this.loginService.criarHeaderAuth()});
  }

}
