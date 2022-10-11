import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../../shared/interfaces/login';
import { Observable } from 'rxjs';
import { URL_BASE } from 'src/environments/environment';
import { ResponseBody } from 'src/app/shared/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private httpClient: HttpClient) { }

  setProfile() {
    const token = sessionStorage.getItem('token');
    let header: HttpHeaders = new HttpHeaders({'token':`${token}`, 'Authorization': `Bearer ${token}`});
    return this.httpClient.get<ResponseBody<Profile>>(URL_BASE.concat('/funcionario/token'), {headers:header});
  }
}
