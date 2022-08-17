import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Extracao, ExtracaoResumido, ExtracaoThread } from '../model/extracao';
import { URL_BASE } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseBody } from 'src/app/shared/interfaces/response';
import { LoginService } from 'src/app/authenticacao/login.service';


@Injectable({
  providedIn: 'root'
})
export class ExtracaoService {

  private readonly EXTRACAO_ENVIAR = '/extracao/enviar';
  private readonly EXTRACAO = '/extracao';
  private readonly EXTRACAO_STATUS_ENVIO_GET_TODOS = '/extracao/envio-status';

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  listarExtracao() {
    console.log(this.loginService.criarHeaderAuth());
    return this.httpClient.get<ResponseBody<ExtracaoResumido[]>>(URL_BASE.concat().concat(this.EXTRACAO), {headers: this.loginService.criarHeaderAuth()});
  }

  listarStatusEnvio(): Observable<ResponseBody<ExtracaoThread[]>> {
    return this.httpClient.get<ResponseBody<ExtracaoThread[]>>(URL_BASE.concat(this.EXTRACAO_STATUS_ENVIO_GET_TODOS), {headers: this.loginService.criarHeaderAuth()});
  }

  salvarExtracao(registro: Extracao): Observable<Extracao> {
    let formData = new FormData();
    formData.append("titulo", registro.titulo);
    formData.append("descricao", registro.descricao);
    formData.append("periodoLetivo", registro.periodoLetivo);
    formData.append("arquivo.conteudo", registro.arquivo.conteudo);
    return this.httpClient.post<Extracao>(URL_BASE.concat(this.EXTRACAO_ENVIAR), formData, {headers: this.loginService.criarHeaderAuth()});
  }

}
