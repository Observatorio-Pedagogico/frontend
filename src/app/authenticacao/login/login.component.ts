import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LoginForm } from 'src/app/shared/interfaces/login';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private loginService: LoginService) {
    this.form = this.formBuilder.group({
      email: [null],
      senha: [null]
      });
  }

  ngOnInit(): void {
  }


  fazerLogin(): void {

    let login = this.form.value as LoginForm;

    this.loginService.logar(login).subscribe({
      next: (response) => {
        sessionStorage.setItem("token",response.data.token);
        location.href = "/extracoes"
      },
      error: (error) => console.error(error),
    });
  }

}
