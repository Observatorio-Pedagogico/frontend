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

  constructor(private httpClient: HttpClient,private router:Router, private loginService: LoginService) { }

  gerarDashboardSexo() {
    return this.httpClient.get<ResponseBody<DashboardResponse>>(URL_BASE.concat(this.DASHBOARD_SEXO), {headers: this.loginService.criarHeaderAuth()});
  }
}
