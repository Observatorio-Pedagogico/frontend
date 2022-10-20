import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Extracao, ExtracaoResumido, ExtracaoThread } from '../model/extracao';
import { URL_BASE } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseBody, ResponsePagina } from 'src/app/shared/interfaces/response';
import { LoginService } from 'src/app/authenticacao/login.service';


@Injectable({
  providedIn: 'root'
})
export class ExtracaoService {

  private readonly EXTRACAO_ENVIAR = '/extracao/enviar';
  private readonly EXTRACAO = '/extracao';
  private readonly EXTRACAO_STATUS_ENVIO_GET_TODOS = '/extracao/envio-status';

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  listarExtracao(argumentos:string[]) {
    return this.httpClient.get<ResponsePagina<ExtracaoResumido[]>>(URL_BASE.concat(this.EXTRACAO).concat(this.montarArgumentos(argumentos)), {headers: this.loginService.criarHeaderAuth()});
  }

  listarStatusEnvio(): Observable<ResponseBody<ExtracaoThread[]>> {
    return this.httpClient.get<ResponseBody<ExtracaoThread[]>>(URL_BASE.concat(this.EXTRACAO_STATUS_ENVIO_GET_TODOS), {headers: this.loginService.criarHeaderAuth()});
  }

  salvarExtracao(registro: Extracao): Observable<Extracao> {
    let formData = new FormData();
    formData.append("titulo", registro.titulo);
    formData.append("descricao", registro.descricao);
    for (const arquivo of registro.arquivosMultipartFile) {
      formData.append("arquivosMultipartFile", arquivo.conteudo);
    }
    return this.httpClient.post<Extracao>(URL_BASE.concat(this.EXTRACAO_ENVIAR), formData, {headers: this.loginService.criarHeaderAuth()});
  }

  ativarExtracao(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.EXTRACAO).concat('/').concat(id).concat('/').concat('ativar'), id, {headers: this.loginService.criarHeaderAuth()});
  }

  cancelarExtracao(id: string): Observable<string> {
    return this.httpClient.post<string>(URL_BASE.concat(this.EXTRACAO).concat('/').concat(id).concat('/').concat('cancelar'), id, {headers: this.loginService.criarHeaderAuth()});
  }

  montarArgumentos(argumentos:string[]): string {
    if (argumentos.length === 0) {
      return '';
    }

    let args = '?';
    argumentos.forEach(element => {
      args+=element.concat('&');
    });

    return args;
  }

}
