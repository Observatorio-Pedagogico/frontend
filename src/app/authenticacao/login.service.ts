import { Router } from '@angular/router';
import { UsuarioCadastro } from './../shared/interfaces/cadastro';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../../environments/environment';
import { LoginForm, LoginResponse } from '../shared/interfaces/login';
import { ResponseBody } from '../shared/interfaces/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,private router:Router) { }

  logar(login: LoginForm) : Observable<LoginForm> {

    let formData = new FormData();
      formData.append("email", login.email);
      formData.append("senha", login.senha);

    return this.httpClient.post<LoginForm>(URL_BASE.concat('/login'), formData);
  }

  cadastrarUsuario(usuario: UsuarioCadastro){
    this.httpClient.post(`${ URL_BASE }/login/cadastrar`, usuario)
    .subscribe(resultado => {
      this.router.navigate(['/login']);
      console.log('usuario cadastrado com sucesso.')
    });
  }

}
