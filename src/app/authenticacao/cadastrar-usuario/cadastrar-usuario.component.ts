import { LoginService } from './../login.service';
import { UsuarioCadastro } from './../../shared/interfaces/cadastro';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  constructor(private loginService:LoginService) {
  }

  ngOnInit(): void {
  }

  cadastrarUsuario(usuario: UsuarioCadastro) {
    this.loginService.cadastrarUsuario(usuario);
  }

  onVoltar(): void {
    location.href = '\login';
  }
}
