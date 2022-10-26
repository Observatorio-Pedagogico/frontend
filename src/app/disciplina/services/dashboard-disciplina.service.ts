import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardResponse } from 'src/app/shared/interfaces/dashboard';
import { ResponseBody } from 'src/app/shared/interfaces/response';
import { URL_BASE } from 'src/environments/environment';

import { LoginService } from '../../authenticacao/login.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardDisciplinaService {

  private readonly DASHBOARD_SEXO = '/dashboard/sexo';

  private readonly DASHBOARD_SITUACAO_ALUNO = '/dashboard/situacao-aluno';

  private readonly DASHBOARD_FREQUENCIA_NOTA = '/dashboard/frequencia-nota';

  private readonly DASHBOARD_NOTAS_DISCIPLINAS = '/dashboard/nota';

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  gerarDashboardSexo(parametros: string) {
    return this.httpClient.get<ResponseBody<DashboardResponse>>(URL_BASE.concat(this.DASHBOARD_SEXO).concat(parametros), {headers: this.loginService.criarHeaderAuth()});
  }

  gerarDashboardSituacaoAlunos(parametros: string) {
    return this.httpClient.get<ResponseBody<DashboardResponse>>(URL_BASE.concat(this.DASHBOARD_SITUACAO_ALUNO).concat(parametros), {headers: this.loginService.criarHeaderAuth()});
  }

  gerarDashboardFrequenciaNota(parametros: string) {
    return this.httpClient.get<ResponseBody<DashboardResponse>>(URL_BASE.concat(this.DASHBOARD_FREQUENCIA_NOTA).concat(parametros), {headers: this.loginService.criarHeaderAuth()});
  }

  gerarDashboardNotasDisciplinas(parametros: string) {
    return this.httpClient.get<ResponseBody<DashboardResponse>>(URL_BASE.concat(this.DASHBOARD_NOTAS_DISCIPLINAS).concat(parametros), {headers: this.loginService.criarHeaderAuth()});
  }

}
