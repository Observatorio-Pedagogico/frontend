import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { URL_BASE } from '../../environments/environment';
import { LoginForm } from '../shared/interfaces/login';
import { UsuarioCadastro } from './../shared/interfaces/cadastro';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,private router:Router) { }

  logar(login: LoginForm) : Observable<LoginForm> {

    return this.httpClient.post<LoginForm>(URL_BASE.concat('/login'), login);
  }

  criarHeaderAuth(): HttpHeaders {
    const token: string | null = sessionStorage.getItem("token");

    if (token === null) {
      return new HttpHeaders();
    }
    let header: HttpHeaders = new HttpHeaders({'Authorization':`Bearer ${token}`});
    return header;
  }

  cadastrarUsuario(usuario: UsuarioCadastro){
    this.httpClient.post(`${ URL_BASE }/login/cadastrar`, usuario)
    .subscribe(resultado => {
      location.href = '/login';
    });
  }

}
