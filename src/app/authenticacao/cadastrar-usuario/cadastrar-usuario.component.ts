import { LoginService } from './../login.service';
import { UsuarioCadastro } from './../../shared/interfaces/cadastro';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../../components/alert/alert/alert.component';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  constructor(private loginService:LoginService,
              private alert: AlertComponent) {
  }

  ngOnInit(): void {
  }

  cadastrarUsuario(usuario: UsuarioCadastro) {
    this.loginService.cadastrarUsuario(usuario);
    this.alert.openAlert("success", "Cadastro Solicitado com Sucesso!", "");
    alert('setTimeout');
  }

  onVoltar(): void {
    location.href = '\login';
  }
}
