import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_BASE } from '../../environments/environment';
import { LoginForm, LoginResponse } from '../shared/interfaces/login';
import { ResponseBody } from '../shared/interfaces/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  logar(login: LoginForm) : Observable<LoginForm> {

    return this.httpClient.post<LoginForm>(URL_BASE.concat('/login'), login);
  }

  criarHeaderAuth(): HttpHeaders {
    const token: string | null = localStorage.getItem("data");
    if (token === null) {
      return new HttpHeaders();
    }
    let header: HttpHeaders = new HttpHeaders({'Authorization':`Bearer ${token}`});
    return header;
  }

}
