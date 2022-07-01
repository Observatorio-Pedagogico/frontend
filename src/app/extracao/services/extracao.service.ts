import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Extracao } from '../model/extracao';
import { URL_BASE } from 'src/environments/environment';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtracaoService {
  private readonly ENVIAR = '/extracao/enviar';
  private readonly GET_TODOS = '/extracao/get-todos';

  constructor(private httpClient: HttpClient) { }

  listar() {
    return this.httpClient.get<Extracao[]>(URL_BASE.concat(this.GET_TODOS))
    .pipe(
      first(),
      tap(extracoes => console.log(extracoes))
    );
  }

  salvar(registro: Extracao) {
    var formData = new FormData();
    formData.append("titulo", registro.titulo);
    formData.append("arquivo.conteudo", registro.arquivo.conteudo);
    return this.httpClient.post<Extracao>(URL_BASE.concat(this.ENVIAR), formData);
  }

}
