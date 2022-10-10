import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardaAutenticacaoService implements CanLoad {

  constructor(private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.isAutenticado()) {
      this.router.navigate(['login'])
    }
    return true;
  }

  private isAutenticado(): boolean {
    const key = sessionStorage.getItem("logado");
    console.log('isAutenticado', key);

    if (key) {
      return key.toLowerCase() === 'true';
    }
    return false;
  }

}
