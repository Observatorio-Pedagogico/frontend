import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Extracao, ExtracaoResumido, ExtracaoThread } from '../model/extracao';
import { URL_BASE } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseBody } from 'src/app/shared/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ExtracaoService {

  private readonly EXTRACAO_ENVIAR = '/extracao/enviar';
  private readonly EXTRACAO = '/extracao';
  private readonly EXTRACAO_STATUS_ENVIO_GET_TODOS = '/extracao/envio-status';

  constructor(private httpClient: HttpClient) { }

  listarExtracao() {
    return this.httpClient.get<ResponseBody<ExtracaoResumido[]>>(URL_BASE.concat().concat(this.EXTRACAO));
  }

  listarStatusEnvio(): Observable<ResponseBody<ExtracaoThread[]>> {
    return this.httpClient.get<ResponseBody<ExtracaoThread[]>>(URL_BASE.concat(this.EXTRACAO_STATUS_ENVIO_GET_TODOS));
  }

  salvarExtracao(registro: Extracao): Observable<Extracao> {
    var formData = new FormData();
    formData.append("titulo", registro.titulo);
    formData.append("descricao", registro.descricao);
    formData.append("periodoLetivo", registro.periodoLetivo);
    formData.append("arquivo.conteudo", registro.arquivo.conteudo);
    return this.httpClient.post<Extracao>(URL_BASE.concat(this.EXTRACAO_ENVIAR), formData);
  }

}
